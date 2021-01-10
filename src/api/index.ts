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
  archiveId: 1,
  archive: [
    {
      id: 1,
      sourceId: 3,
      title: "Docker 从入门到放弃 😒",
      createTime: 1610182176778
    }
  ]
};

const proxy = (cb: () => void, timeout = 200) => {
  setTimeout(cb, timeout);
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

export const updateTodo = (id: number, value: string) =>
  new Promise<{ status: true }>(r => {
    proxy(() => {
      db.todo = db.todo.map(i => (i.id === id ? { ...i, value } : i));
      r({ status: true });
    }, 400);
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
        sourceId: archive.id,
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

export const backArchive = (id: number) =>
  new Promise<{ status: true }>(r => {
    proxy(() => {
      db.archive = db.archive.filter(r => {
        if (r.id === id) {
          db.todo.unshift({
            id: r.sourceId,
            title: r.title,
            createTime: r.createTime
          });
          return false;
        }
        return true;
      });

      r({ status: true });
    });
  });
