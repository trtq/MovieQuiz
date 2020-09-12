export function createGameStore() {
  return {
    bugs: ['Centipede'] as string[],
    addBug(bug: string) {
      this.bugs.push(bug);
    },
    get bugsCount() {
      return this.bugs.length;
    },
  };
}

export type TGameStore = ReturnType<typeof createGameStore>;
