<template>
    <div class="group">
        <span>#{{ group.id }}</span>
        <a class="group__name">{{ name }}</a>
        <a class="group__icon">
            <i class="fa fa-trash" @click="deleteGroup"></i>
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
                this.$store.commit('deleteGroup', this.group.id);
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