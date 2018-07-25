<template>
    <div class="group">
        <a class="group__name" @click="openGroup()">{{ name }}</a>
        <a class="group__icon">
            <i class="fa fa-trash" @click="deleteGroup()"></i>
        </a>
    </div>
</template>

<script>
    export default {
        props: ['group'],
        computed: {
            name() {
                return this.group.name;
            }
        },
        methods: {
            deleteGroup() {
                browser.storage.local.remove('group' + this.group.id);
                this.$store.commit('deleteGroup', this.group.id);
            },
            openGroup() {
                browser.tabs.query({
                    currentWindow: true
                }).then(tabs => {
                    // IDs of tabs to be closed
                    const ids = tabs.map(tab => {
                        return tab.id;
                    });
                    // Open tabs
                    this.group.tabs.map(tab => {
                        browser.tabs.create({ url: tab.url });
                    });
                    // Close the old ones
                    browser.tabs.remove(ids);
                });
            }
      }
    }
</script>

<style lang="scss">
    .group {
        margin: .8em 0;
        display: flex;
        align-items: center;
    }

    .group__name {
        flex-grow: 2;
        cursor: pointer;
        padding: .4em;
    }

    .group__name:hover {
        background: #eee;
        color: #333;
    }

    .group__icon {
        width: 16px;
        height: 16px;
        margin: 0 6px;
        cursor: pointer;
    }
</style>