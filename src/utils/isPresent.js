const isPresent = (singleBook) => {
  const [isPresentRead, setIsPresentRead] = useState(undefined);
  const [isPresentWish, setIsPresentWish] = useState(undefined);

  setIsPresentRead(readBooks?.some((book) => book === singleBook));
  setIsPresentWish(wishlistBooks?.some((book) => book === singleBook));
};
