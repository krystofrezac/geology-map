let lastId = 0;

const newID = (prefix = 'id'): string => {
  lastId++;
  return `${prefix}${lastId}`;
};

export default newID;
