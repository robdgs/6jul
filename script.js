(function () {
  const newProducts = Array.from(
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22,
      23, 24, 25, 26, 27, 28, 29,
    ],
    (_, index) => {
      return {
        id: 1,
        name: `SASSY SALMON - ${_}`,
        price: 40 + index,
        stock: 12 + index,
        img: "https://c.tenor.com/7xvdEql6Z28AAAAd/smirk-smirk-afk.gif",
        alertPrice: function () {
          alert("il prezzo di questo salmone è:" + this.price);
        },
      };
    }
  );

  const shop = {
    page: 0,
    perPage: 10,

    products: [],

    setPage(newPage) {
      this.page = newPage;
      this.renderHTML();
    },

    // torna solo i prodotti dentro shop.products nella vista corrente
    getProducts() {
      const startIndex = this.page * this.perPage;
      const endIndex = startIndex + this.perPage;

      const slicedProducts = this.products.slice(startIndex, endIndex);

      return slicedProducts;
    },

    // imposta i prodotti dentro shop.products e stampa in pagina
    setProducts(products) {
      this.products = products;
      this.renderHTML();
    },

    renderHTML() {
      const productsHTML = this.getProducts()
        .map((product) => {
          const { name, price, img } = product;

          return `<li id="listItem"><img class='salmon'src="${img}"> ${name} - ${price}€</li>`;
        })

        .join("");
      const myProductsInPAge = (document.querySelector(
        ".shop"
      ).innerHTML = `<div>Page: ${this.page + 1}</div>
  <div>Showing: ${this.getProducts().length}/${this.products.length}</div>
<br>
  <ul>${productsHTML}</ul>`);

      if (this.page != 0 && this.page == 1) {
        document.querySelector(".shop").innerHTML =
          `<h2>PAGE TWO</h2>` + myProductsInPAge;
      } else if (this.page != 0 && this.page == 2) {
        document.querySelector(".shop").innerHTML =
          `<h2>PAGE THREE</h2> ` + myProductsInPAge;
      } else {
        document.querySelector(".shop").innerHTML =
          `
        <h2>PAGE ONE</h2>` + myProductsInPAge;
      }
    },
  };

  shop.setProducts(newProducts);

  const $pagination = document.querySelector(".pagination");
  const $buttons = document.querySelectorAll(".pagination button");

  $pagination.addEventListener("click", function (event) {
    //console.log("click su pagination");
    // console.log("event target:", event.target);

    if (event.target.tagName === "BUTTON") {
      event.preventDefault();

      //console.log("stai cliccando su un button");
      const buttonEl = event.target;
      const newPage = Number(buttonEl.innerText) - 1;

      shop.setPage(newPage);
    }
  });
})();

//niente alert onclick
