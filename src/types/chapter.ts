export default interface Chapter {
  title: string;
  number: string;
  image: string;
  date: Date;
  id: string;
  manga: {
    title: string;
    id: string;
  };
}
