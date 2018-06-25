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
            <div class="save-action">
                <input type="text" v-model="groupName">
                <button class="button" @click="saveTabs()">Save</button>
            </div>
        </div>
        <div class="loading-wheel" v-show="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
    </div>
</template>

<script>
    // TODO: Use Vuex for state management
    import Group from './group';

    // TODO: Maybe use different naming
    import GroupObj from '../group';

    export default {
        components: {
            Group
        },
        data() {
            return {
                groupName: ''
            }
        },
        computed: {
            isLoading() {
                return this.$store.state.isLoading;
            },
            groups() {
                return this.$store.state.groups;
            }
        },
        methods: {
            saveTabs() {
                this.$store.commit('enableLoading');
                browser.tabs.query({ currentWindow: true })
                    .then(tabs => {
                        // TODO: Should we get rid of that?
                        const key = Object.keys(tabs[0]);

                        const contentToStore = [];

                        tabs.map((tab, index) => {
                            contentToStore.push({
                                url: tab.url,
                                title: tab.title,
                                favicon: tab.favIconUrl
                            });
                        });

                        // TODO: Actually store the content. Chose the storage first.
                        console.log(contentToStore);

                        this.$store.commit('addGroup', new GroupObj(this.groupName));
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
        padding: 0 1.4em 1.4em;
    }

    .groups { }

    .button {
        padding: .4em .6em;
        cursor: pointer;
    }

    .save-action {
        display: flex;
        justify-content: space-between;
        width: 100%;

        input {
            width: 60%;
        }

        button {
            width: 30%;
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
</style>