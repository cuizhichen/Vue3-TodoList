import { TodoItem, ArchiveItem } from "@/type";

const db: {
  todoId: number;
  todo: TodoItem[];
  archiveId: number;
  archive: ArchiveItem[];
} = {
  todoId: 2,
  todo: [
    { id: 1, title: "小郡肝串串 🍢", createTime: 1610182276778 },
    { id: 2, title: "学会 Vue3.0 😎", createTime: 1610182286778 }
  ],
  archiveId: 0,
  archive: []
};

// const json = (val: unknown) => JSON.parse(JSON.stringify(val));

const proxy = (cb: () => void) => {
  setTimeout(cb, 300);
};

export const getTodo = () =>
  new Promise<{ todo: TodoItem[]; archive: ArchiveItem[] }>(r => {
    proxy(() => r({ todo: db.todo, archive: db.archive }));
  });

export const createTodo = (title: string) =>
  new Promise<{ status: true }>(r => {
    proxy(() => {
      db.todo.unshift({ id: ++db.todoId, title, createTime: Date.now() });
      r({ status: true });
    });
  });

export const deleteTodo = (id: number) =>
  new Promise<{ status: true }>(r => {
    proxy(() => {
      db.todo = db.todo.filter(i => i.id !== id);
      r({ status: true });
    });
  });

export const createArchive = (archive: TodoItem) =>
  new Promise<{ status: true }>(r => {
    proxy(() => {
      db.archive.unshift({
        ...archive,
        resourceId: archive.id,
        id: ++db.archiveId
      });
      r({ status: true });
    });
  });

export const deleteArchive = (id: number) =>
  new Promise<{ status: true }>(r => {
    proxy(() => {
      db.archive = db.archive.filter(i => i.id !== id);
      r({ status: true });
    });
  });
