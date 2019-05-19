<template>
  <div class="app">
    <h1>Tabby</h1>

    <div class="content">
      <div class="groups">
        <group
          v-for="group in groups"
          :key="group.id"
          :group="group"
          @open-group="openGroup($event)"
          @update-group="updateGroup($event)"
          @delete-group="deleteGroup($event)"
        />
      </div>

      <form
        class="save-action"
        @submit.prevent="createGroup"
      >
        <input
          v-model="groupName"
          type="text"
        >

        <button class="button">
          Save
        </button>
      </form>
    </div>

    <div
      v-show="isLoading"
      class="loading-wheel"
    >
      <fa
        icon="spinner"
        size="2x"
        spin
      />
    </div>

    <div
      class="info-window"
      :class="{
        ['info-window--' + infoWindow.type]: true,
        visible: infoWindow.show
      }"
    >
      <fa
        v-if="infoWindow.icon"
        :icon="infoWindow.icon"
      />

      {{ infoWindow.message }}
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import { mapState } from 'vuex';
import Group from './Group';
import GroupRepository from '../group-repository';
import TabRepository from '../tab-repository';

import togglesLoading from '../mixins/togglesLoading';
import showsMessage from '../mixins/showsMessage';
import { ID } from '../utils';

export default {
  components: {
    Group,
  },

  mixins: [
    togglesLoading,
    showsMessage,
  ],

  data: () => ({
    groupName: '',
  }),

  computed: {
    ...mapState([
      'isLoading',
      'groups',
      'infoWindow',
    ]),
  },

  async mounted() {
    this.loading(true);

    // await browser.storage.local.clear()

    try {
      this.$store.commit(
        'setGroups',
        await GroupRepository.all(),
      );
    } catch (exception) {
      this.error('Whoops. Something went wrong.');

      // eslint-disable-next-line
      console.error(exception)
    }

    this.loading(false);
  },

  methods: {
    async createGroup() {
      if (this.groupName === '') return;

      this.loading(true);

      try {
        const tabs = await TabRepository.all();

        const newGroup = {
          id: ID(),
          name: this.groupName,
          tabs: tabs.map(tab => ({
            url: tab.url,
            title: tab.title,
            pinned: tab.pinned,
            favIconurl: tab.favIconurl,
            cookieStoreId: tab.cookieStoreId,
          })),
        };

        GroupRepository.addGroup(newGroup);

        this.$store.commit('addGroup', newGroup);
        this.groupName = '';
      } catch (exception) {
        this.error('Whoops. Something went wrong.');

        // eslint-disable-next-line
        console.error(exception)
      }

      this.loading(false);
    },

    async openGroup(id) {
      const tabs = await TabRepository.all();
      const ids = tabs.map(tab => tab.id);
      const group = this.$store.state.groups.find(item => item.id === id);

      // Open tabs
      group.tabs.forEach((tab) => {
        browser.tabs.create({
          url: tab.url,
          pinned: tab.pinned,
          cookieStoreId: tab.cookieStoreId
        });
      });

      // Close the old ones
      browser.tabs.remove(ids);

      // Close the popup
      window.close();
    },

    async updateGroup(id) {
      const tabs = await TabRepository.all();

      GroupRepository.updateGroup(id, tabs);
      this.$store.commit('updateGroup', {
        groupId: id,
        tabs,
      });

      this.success('Group successfully updated');
    },

    deleteGroup(id) {
      GroupRepository.deleteGroup(id);
      this.$store.commit('deleteGroup', id);
    },
  },
};
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    color: #555;
  }

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
    font-family: sans-serif;
    text-rendering: auto;
    color: white;

    &.visible {
      top: 0;
    }

    &.info-window--success {
      background: #28a745;
    }

    &.info-window--error {
      background: #dc3545;
    }

  }
</style>
