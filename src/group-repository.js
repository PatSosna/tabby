/* eslint-disable no-undef */

const STORAGE_TYPE = 'local';

export default {

  async all() {
    const { groups } = await browser.storage[STORAGE_TYPE].get({
      groups: [],
    });

    return groups.map(group => JSON.parse(group));
  },

  async setGroups(groups) {
    browser.storage[STORAGE_TYPE].set({
      groups: groups.map(group => JSON.stringify(group)),
    });
  },

  async addGroup(group) {
    const { groups } = await browser.storage[STORAGE_TYPE].get({
      groups: [],
    });

    const newGroups = [
      ...groups,
      JSON.stringify(group),
    ];

    browser.storage[STORAGE_TYPE].set({
      groups: newGroups,
    });
  },

  async deleteGroup(groupId) {
    const groups = (await this.all())
      .filter(group => group.id !== groupId)
      .map(group => JSON.stringify(group));

    await browser.storage[STORAGE_TYPE].set({ groups });
  },

  async updateGroup(groupId, tabs) {
    const groups = (await this.all());
    const group = groups.find(item => item.id === groupId);

    group.tabs = tabs;

    this.setGroups(groups);
  },
};
