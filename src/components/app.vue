<template>
    <div class="app">
        <h1>Tabby</h1>
        <div class="content">
            <div class="groups">
                <group v-for="group in groups"
                       :group="group"
                       :key="group.id"
                ></group>
            </div>
            <form @submit.prevent="saveTabs()" class="save-action">
                <input type="text" v-model="groupName">
                <button class="button">Save</button>
            </form>
        </div>
        <div class="loading-wheel" v-show="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>

        <div
                class="info-window"
                :class="{
                    ['info-window--' + infoWindowType]: true,
                    'visible': isInfoWindowActive
                }"
        >
            {{ infoWindowMessage }}
        </div>
    </div>
</template>

<script>
    import Group from './group';

    // TODO: Maybe use different naming
    import GroupObj from '../group';

    export default {
        components: {
            Group
        },
        data() {
            return {
                groupName: '',
                infoWindow: {
                    show: true,
                    type: 'success',
                    message: ''
                }
            }
        },
        computed: {
            isLoading() { return this.$store.state.isLoading; },
            groups() { return this.$store.state.groups; },
            isInfoWindowActive() { return this.$store.state.infoWindow.show; },
            infoWindowMessage() { return this.$store.state.infoWindow.message; },
            infoWindowType() { return this.$store.state.infoWindow.type; }
        },
        mounted() {
            browser.storage.local.get()
                .then(groups => {
                    const content = [];

                    for (let key in groups) {
                        if (groups.hasOwnProperty(key)) {
                            content.push(groups[key]);
                        }
                    }

                    this.$store.commit('initContent', content);
                });
        },
        methods: {
            saveTabs() {
                if (this.groupName === '') return;

                this.$store.commit('enableLoading');
                browser.tabs.query({ currentWindow: true })
                    .then(tabs => {
                        const tabsContent = [];

                        // Todo create object representing a set of tabs
                        tabs.map((tab, index) => {
                            tabsContent.push({
                                url: tab.url,
                                title: tab.title,
                                favicon: tab.favIconUrl
                            });
                        });

                        const group = new GroupObj(this.groupName);
                        group.tabs = tabsContent;

                        browser.storage.local.set({
                            ['group' + group.id]: group
                        });

                        this.$store.commit('addGroup', group);
                        this.$store.commit('disableLoading');
                        this.groupName = '';
                    });
            }
        }
    }
</script>

<style lang="scss">
    .app {
        width: 18em;
    }

    h1 {
        text-align: center;
        margin: 0;
        font-size: 1.6em;
        padding: .4em .2em;
        border-bottom: 1px solid #eee;
    }

    .content {
        padding: 1.4em;
    }

    .groups {
        margin-bottom: 1em;
    }

    .button {
        padding: .4em .6em;
        cursor: pointer;
    }

    .save-action {
        display: flex;
        justify-content: space-between;

        input {
            min-width: 0;
            margin-right: 4px;
        }

        button {
            flex: 0 0 80px;
        }
    }

    .loading-wheel {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .info-window {
        position: absolute;
        top: -3em;
        transition: top ease .4s;
        left: 0;
        width: 100%;
        height: 3em;
        padding: 1em;
        background: white;
        font-family: sans-serif, FontAwesome;
        text-rendering: auto;
        color: white;

        &.visible {
            top: 0;
        }

        &.info-window--success {
            background: #28a745;

            &:before {
                content: "\F00C";
            }
        }

        &.info-window--error {
            background: #dc3545;

            &:before {
                content: "\F00D";
            }
        }
    }
</style>