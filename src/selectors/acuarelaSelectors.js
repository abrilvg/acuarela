export const getAcuarelasByUser = (store, userId) => {
  return store.acuarelas.filter(acuarela => acuarela.authorId === userId );
};
