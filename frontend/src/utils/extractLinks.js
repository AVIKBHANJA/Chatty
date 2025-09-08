function extractLinks(inputString, incoming) {
  //
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Array to hold the found links
  const linksArray = [];

  // Replacing the URLs with the desired HTML structure
  const modifiedString = inputString.replace(urlRegex, (url) => {
    const urlObject = new URL(url);
    const domain = urlObject.hostname;
    linksArray.push(url);
    return `<span class={"${incoming ? "text-primary" : 'text-white'} underline"}><a href="${url}" target="_blank">${domain}</a></span>`;
  });

  return {
    originalString: modifiedString,
    links: linksArray,
  };
}

export default extractLinks;
