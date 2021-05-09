function Banner(props) {
  if (props.nomineeCount === 5) {
    return (
      <div id="banner">You have successfully selected 5 nominees!</div>
    );
  } else return null;
}

export default Banner;
