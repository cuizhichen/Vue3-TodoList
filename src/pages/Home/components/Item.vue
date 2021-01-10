<template>
  <div class="item">
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
  </div>
</template>

<script lang="ts">
import { useMutation } from "@/common/hooks";
import { TodoItem } from "@/type";
import {
  deleteTodo as deleteTodoApi,
  deleteArchive as deleteArchiveApi
} from "@/api";
import { defineComponent, PropType } from "vue";

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
    const [deleteTodo] = useMutation(deleteTodoApi, {
      onComplated: () => emit("onTodoDeleted")
    });
    const [deleteArchive] = useMutation(deleteArchiveApi, {
      onComplated: () => emit("onArchiveDeleted")
    });

    return { deleteTodo, deleteArchive };
  }
});
</script>

<style scoped lang="scss">
.item {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
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
}
</style>
