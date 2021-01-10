export type TodoItem = {
  id: number;
  title: string;
  createTime: number;
};

export type ArchiveItem = TodoItem & { resourceId: number };
