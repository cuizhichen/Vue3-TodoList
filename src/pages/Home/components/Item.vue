<template>
  <div
    :class="[
      'item',
      (deleteTodoLoading || deleteArchiveLoading || isDelted) && 'deleting'
    ]"
  >
    <div class="left">
      <div class="title" :title="item.title">{{ item.title }}</div>
      <div class="create-time">
        {{ new Date(item.createTime).toLocaleString() }}
      </div>
    </div>
    <div class="right">
      <template v-if="isTodo">
        <!-- <span class="edit" title="编辑">编</span> -->
        <span class="delete" title="归档" @click="deleteTodo(item.id)">归</span>
      </template>
      <span v-else class="delete" title="删除" @click="deleteArchive(item.id)">
        删
      </span>
    </div>
    <div
      class="delete-mask"
      v-if="deleteTodoLoading || deleteArchiveLoading || isDelted"
    >
      <span class="inner-text">
        {{ isTodo ? "归档待办项中" : "删除待办项中" }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { useMutation } from "@/common/hooks";
import { TodoItem } from "@/type";
import {
  deleteTodo as deleteTodoApi,
  deleteArchive as deleteArchiveApi
} from "@/api";
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<TodoItem>,
      require: true
    },
    isTodo: {
      type: Boolean,
      default: true
    }
  },
  emits: ["onTodoDeleted", "onArchiveDeleted"],
  setup(props, { emit }) {
    const isDelted = ref(false);
    const [deleteTodo, { loading: deleteTodoLoading }] = useMutation(
      deleteTodoApi,
      {
        onComplated: () => {
          isDelted.value = true;
          emit("onTodoDeleted");
        }
      }
    );
    const [deleteArchive, { loading: deleteArchiveLoading }] = useMutation(
      deleteArchiveApi,
      {
        onComplated: () => {
          isDelted.value = true;
          emit("onArchiveDeleted");
        }
      }
    );

    return {
      deleteTodo,
      deleteTodoLoading,
      deleteArchive,
      deleteArchiveLoading,
      isDelted
    };
  }
});
</script>

<style scoped lang="scss">
.item {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &:not(.deleting):hover {
    background: #dbdefd;
  }

  .left {
    flex: 1;
    overflow: hidden;
    margin-right: 12px;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
    .create-time {
      margin-top: 8px;
      font-size: 13px;
      color: #aaa;
      font-weight: 300;
    }
  }

  .right {
    font-size: 12px;
    color: #999;
    font-weight: 300;
    flex-shrink: 0;

    .edit,
    .delete {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border: 1px solid #ccc;
      border-radius: 50%;
      cursor: pointer;
    }
    .edit {
      margin-right: 4px;
      &:hover {
        border-color: blue;
        color: blue;
      }
    }
    .delete {
      &:hover {
        border-color: red;
        color: red;
      }
    }
  }

  .delete-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(red, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #b30000;
    .inner-text {
      &:after {
        position: absolute;
        content: "";
        animation: loading 150ms infinite alternate-reverse;
      }
    }
  }
}
</style>
