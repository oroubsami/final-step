document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".swiper", {
      loop: true, // التمرير اللانهائي
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 3000, // الانتقال التلقائي كل 3 ثوانٍ
      },
    });
  });

  

  document.addEventListener("DOMContentLoaded", function () {
    const testimonials = [
        { name: "Bonnie Tolbert", text: "There are many variations of passages of available but the majority have suffered alteration in some form by injected humor or random word which don’t look even." },
        { name: "James Carter", text: "I had an amazing experience with this service. Highly recommend to anyone looking for quality!" },
        { name: "Linda Robertson", text: "One of the best platforms I have ever used. The interface is smooth and easy to navigate." }
    ];

    let currentTestimonial = 0;
    const nameElement = document.querySelector(".testimonial-box strong");
    const textElement = document.querySelector(".testimonial-box p:nth-of-type(2)");

    function updateTestimonial() {
        nameElement.style.opacity = "0";
        textElement.style.opacity = "0";

        setTimeout(() => {
            nameElement.textContent = testimonials[currentTestimonial].name;
            textElement.textContent = testimonials[currentTestimonial].text;
            nameElement.style.opacity = "1";
            textElement.style.opacity = "1";
        }, 300);
    }

    document.querySelector(".testimonial-controls button:first-child").addEventListener("click", function () {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    });

    document.querySelector(".testimonial-controls button:last-child").addEventListener("click", function () {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    });

    updateTestimonial(); // تحديث أولي عند تحميل الصفحة
});


//FAQ
function toggleFaq(element) {
    element.classList.toggle("faq-open");
    let answer = element.querySelector(".faq-answer");
    answer.style.display = answer.style.display === "block" ? "none" : "block";
}


//shop

document.addEventListener("DOMContentLoaded", function() {
  const productCards = document.querySelectorAll(".card");
  productCards.forEach(card => {
      card.addEventListener("click", function() {
          alert("تم النقر على المنتج: " + this.querySelector(".card-title").textContent);
      });
  });
});



//
document.addEventListener("DOMContentLoaded", function () {
  const cartList = document.getElementById("cart-items-list");
  const totalAmount = document.getElementById("cart-total-amount");
  const clearCartBtn = document.getElementById("reset-cart");

  if (!cartList) {
      console.error("Error: Element 'cart-items-list' is missing.");
      return;
  }
  if (!totalAmount) {
      console.error("Error: Element 'cart-total-amount' is missing.");
      return;
  }
  if (!clearCartBtn) {
      console.error("Error: Element 'reset-cart' is missing.");
      return;
  }

  let cart = [];

  function addItemToCart(productName, price) {
      const existingCartItem = cart.find(item => item.name === productName);
      if (existingCartItem) {
          existingCartItem.quantity += 1;
      } else {
          cart.push({ name: productName, price: price, quantity: 1 });
      }
      updateCart();
  }

  function updateCart() {
      if (!cartList || !totalAmount) return;
      cartList.innerHTML = "";
      let totalCost = 0;

      cart.forEach((item, index) => {
          const cartItem = document.createElement("li");
          cartItem.innerHTML = `
              <span style="color: green; font-weight: bold;">${item.name} (x${item.quantity})</span> - 
              <span style="color: green;">$${(item.price * item.quantity).toFixed(2)}</span>
              <button class="btn btn-sm btn-success remove-cart-item" data-index="${index}">X</button>
          `;
          cartList.appendChild(cartItem);

          totalCost += item.price * item.quantity;
      });

      totalAmount.innerText = totalCost.toFixed(2);

      document.querySelectorAll(".remove-cart-item").forEach(button => {
          button.addEventListener("click", function () {
              const itemIndex = this.dataset.index;
              removeFromCart(itemIndex);
          });
      });
  }

  function removeFromCart(index) {
      cart.splice(index, 1);
      updateCart();
  }

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.classList.remove("btn-primary");
      button.classList.add("btn-success");
      
      button.addEventListener("click", function () {
          const productCard = this.closest(".product-card");
          if (!productCard) return;
          
          const productNameElem = productCard.querySelector("h5");
          const productPriceElem = productCard.querySelector("p strong");
          if (!productNameElem || !productPriceElem) return;
          
          const productName = productNameElem.innerText;
          const productPrice = parseFloat(productPriceElem.innerText.replace("$", ""));
          
          if (!isNaN(productPrice)) {
              addItemToCart(productName, productPrice);
          }
      });
  });

  if (clearCartBtn) {
      clearCartBtn.classList.remove("btn-warning");
      clearCartBtn.classList.add("btn-success");
      clearCartBtn.addEventListener("click", function () {
          cart = [];
          updateCart();
      });
  }

  document.querySelectorAll("h5").forEach(title => {
      title.classList.remove("text-primary");
      title.classList.add("text-success");
  });
});
