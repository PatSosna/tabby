<template>
  <div class="group">
    <a
      class="group__name"
      @click="$emit('open-group', group.id)"
    >{{ group.name }}</a>

    <a
      class="group__icon"
      title="Update this group with currently opened tabs"
      @click="$emit('update-group', group.id)"
    >
      <fa icon="redo" />
    </a>

    <a
      class="group__icon"
      @click="$emit('delete-group', group.id)"
    >
      <fa icon="trash" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
    .group {
        display: flex;
        align-items: center;
        border-bottom: 1px dashed #eee;
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
