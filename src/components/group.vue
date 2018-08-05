<template>
    <div class="group">
        <a class="group__name" @click="openGroup()">{{ name }}</a>
        <a class="group__icon" title="Update this group with currently opened tabs">
            <i class="fa fa-refresh" @click="updateGroup()"></i>
        </a>
        <a class="group__icon">
            <i class="fa fa-trash" @click="deleteGroup()"></i>
        </a>
    </div>
</template>

<script>
    import GroupObj from '../group';

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
                browser.tabs.query({ currentWindow: true })
                    .then(tabs => {
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
                        // Close the popup
                        window.close();
                    });
            },
            /**
             * Todo: This is exactly the same as the saveTabs
             *       method in app.vue. Consider using some sort of facade
             *       here.
             */
            updateGroup() {
                // TODO: Create facades for querying browser data
                // TODO: Rewrite with async/await

                // Get tabs from current window
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

                        // Clear storage
                        browser.storage.local.clear()
                            .then(() => {
                                // Update storage
                                const group = new GroupObj(this.group.name);
                                group.tabs = tabsContent;

                                browser.storage.local.set({
                                    ['group' + group.id]: group
                                });

                                // Inform user
                                const message = 'Successfully updated';
                                const type = 'success';

                                this.$store.commit('flashMessage', { message, type });
                                this.$store.commit('updateGroup', { groupId: group.id, tabs: tabsContent });
                            });
                    });
            }
      }
    }
</script>

<style lang="scss">
    .group {
        display: flex;
        align-items: center;
    }

    .group__name {
        flex-grow: 2;
        cursor: pointer;
        padding: .6em;
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