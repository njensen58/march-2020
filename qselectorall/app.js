function myQuerySelectorAll(selector) {
  let ELEMENT = "localName",
    CLASS = "classList",
    ID = "id",
    ElCl = "element&Class",
    ElId = "element&Id";
  let searchFor, search, el, cl, id;
  const matches = [];
  let queue = [document.body];

  
  if (selector[0] === ".") {
    searchFor = CLASS;
  } else if (selector[0] !== "." && selector.indexOf(".") !== -1) {
    searchFor = ElCl;
  } else if (selector[0] !== "#" && selector.indexOf("#") !== -1) {
    searchFor = ElId;
  } else if (selector[0] === "#") {
    searchFor = ID;
  } else {
    searchFor = ELEMENT;
  }

  while (queue.length) {
    let node = queue.shift();
    if (node.children) {
      queue = [...queue, ...node.children];
    }

    switch (searchFor) {
      case "localName":
        if (node[searchFor] === selector) {
          matches.push(node);
        }
        break;
      case "classList":
        if (node[searchFor].contains(selector.slice(1))) {
          matches.push(node);
        }
        break;
      case "id":
        if (node[searchFor] === selector.slice(1)) {
          matches.push(node);
          return matches;
        }
      case "element&Class":
        search = ["localName", "classList"];
        [el, cl] = selector.split(".");
        if (node[search[0]] === el && node[search[1]].contains(cl)) {
          matches.push(node);
          break;
        }
      case "element&Id":
        search = ["localName", "id"];
        [el, id] = selector.split("#");
        if (node[search[0]] === el && node[search[1]] === id) {
          matches.push(node);
          return matches;
        }
      default:
        break;
    }
  }
  return matches;
}

console.log(myQuerySelectorAll("h1#header"));
