<template>
  <div
    :class="[
      'item',
      (deleteTodoLoading || deleteArchiveLoading || isDelted) && 'deleting',
      updateTodoLoading && 'editing',
      (backArchiveLoading || isBacked) && 'backing'
    ]"
  >
    <div class="left">
      <input
        class="edit-input"
        type="text"
        v-focusx
        v-if="isEditing"
        :value="item.title"
        ref="editInput"
      />
      <div class="title" :title="item.title" v-else>{{ item.title }}</div>
      <div class="create-time">
        {{ new Date(item.createTime).toLocaleString() }}
      </div>
    </div>
    <div class="right">
      <template v-if="isEditing">
        <span class="save" @click="onClickSave">保存</span>
        <span class="cancel" @click="isEditing = false">取消</span>
      </template>
      <template v-else-if="isTodo">
        <span class="edit" title="编辑" @click="onClickEdit">编</span>
        <span class="delete" title="归档" @click="deleteTodo(item.id)">归</span>
      </template>
      <template v-else>
        <span class="back" title="回档" @click="backArchive(item.id)">
          回
        </span>
        <span class="delete" title="删除" @click="deleteArchive(item.id)">
          删
        </span>
      </template>
    </div>
    <div
      class="deleting-mask"
      v-if="deleteTodoLoading || deleteArchiveLoading || isDelted"
    >
      <span class="inner-text">
        {{ isTodo ? "归档待办项中" : "删除待办项中" }}
      </span>
    </div>
    <div class="editing-mask" v-if="updateTodoLoading">
      <span class="inner-text">
        待办项更新中
      </span>
    </div>
    <div class="backing-mask" v-if="backArchiveLoading || isBacked">
      <span class="inner-text">
        回档中
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { useMutation } from "@/common/hooks";
import { TodoItem } from "@/type";
import {
  deleteTodo as deleteTodoApi,
  deleteArchive as deleteArchiveApi,
  updateTodo as updateTodoApi,
  backArchive as backArchiveApi
} from "@/api";
import { defineComponent, PropType, ref, toRefs } from "vue";

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
  emits: [
    "onTodoUpdated",
    "onTodoDeleted",
    "onArchiveDeleted",
    "onBackArchive"
  ],
  setup(props, { emit }) {
    const { item } = toRefs(props);
    const isDelted = ref(false);
    const isEditing = ref(false);
    const isBacked = ref(false);
    const editInput = ref<HTMLInputElement>();

    const [updateTodo, { loading: updateTodoLoading }] = useMutation(
      updateTodoApi,
      {
        onComplated: () => {
          if (item?.value && editInput.value) {
            isEditing.value = false;
            item.value.title = editInput.value.value;
          }
        }
      }
    );
    const [backArchive, { loading: backArchiveLoading }] = useMutation(
      backArchiveApi,
      {
        onComplated: () => {
          isBacked.value = true;
          emit("onBackArchive");
        }
      }
    );
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

    const onClickEdit = () => {
      isEditing.value = true;
    };

    const onClickSave = () => {
      const newValue = editInput.value?.value;

      if (item?.value && newValue) {
        if (item.value.title === newValue) {
          isEditing.value = false;
          return;
        }
        updateTodo(item.value.id, newValue);
      } else {
        console.error("异常错误");
        alert("待办项标题不可为空");
      }
    };

    // const backArchive = (id: number) => {};

    return {
      deleteTodo,
      deleteTodoLoading,
      deleteArchive,
      deleteArchiveLoading,
      isDelted,
      isEditing,
      onClickEdit,
      onClickSave,
      editInput,
      updateTodoLoading,
      backArchive,
      backArchiveLoading,
      isBacked
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

  &:not(.deleting):not(.editing):not(.backing):hover {
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
      line-height: 24px;
    }
    .create-time {
      margin-top: 2px;
      font-size: 13px;
      color: #aaa;
      font-weight: 300;
    }
    .edit-input {
      width: 100%;
      height: 24px;
      font-size: 13px;
      border: 1px solid rgba(blue, 0.6);
      border-radius: 4px;
      padding: 0 6px;
      outline: none;
    }
  }

  .right {
    font-size: 12px;
    color: #999;
    font-weight: 300;
    flex-shrink: 0;

    .edit,
    .delete,
    .save,
    .cancel,
    .back {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border: 1px solid #ccc;
      border-radius: 50%;
      cursor: pointer;
    }
    .edit,
    .back {
      margin-right: 4px;
      &:hover {
        border-color: blue;
        color: blue;
      }
    }
    .delete,
    .cancel {
      &:hover {
        border-color: red;
        color: red;
      }
    }

    .save,
    .cancel {
      border-radius: 4px;
      width: auto;
      padding: 0 6px;
    }
    .save {
      margin-right: 4px;
      border-color: blue;
      color: blue;
      &:hover {
        background: blue;
        color: white;
        font-weight: 600;
      }
    }
  }

  .deleting-mask,
  .editing-mask,
  .backing-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;

    .inner-text {
      &:after {
        position: absolute;
        content: "";
        animation: loading 150ms infinite alternate-reverse;
      }
    }
  }
  .deleting-mask {
    background: rgba(red, 0.3);
    color: #b30000;
  }
  .editing-mask,
  .backing-mask {
    background: rgba(blue, 0.3);
    color: blue;
  }
}
</style>
