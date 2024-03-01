/* All data: https://openapi.programming-hero.com/api/ai/tools

Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

Single data Example: https://openapi.programming-hero.com/api/ai/tool/01 */

const loadData = async (isShowAll, isSortButton) => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/ai/tools"
  );
  const data = await response.json();
  const cards = data.data.tools;
  //   console.log(cards);
  displayData(cards, isShowAll, isSortButton);
};

const sortByDate = () => {
  isSortButton = true;
  loadData(false, isSortButton);
};

const displayData = (cards, isShowAll, isSortButton) => {
  const selectedContainer = document.getElementById("selected-Container");
  selectedContainer.textContent = "";

  const showAllDiv = document.getElementById("show-all-div");

  if (isSortButton) {
    cards.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
  }

  if (cards.length > 6 && !isShowAll) {
    showAllDiv.classList.remove("hidden");
  } else {
    showAllDiv.classList.add("hidden");
  }
  if (!isShowAll) {
    cards = cards.slice(0, 6);
  }

  cards.forEach((card) => {
    console.log(card);

    const aiDiv = document.createElement("div");
    aiDiv.classList = "card w-full bg-base-100 shadow-xl rounded-2xl";
    aiDiv.innerHTML = `
      
       <figure class="h-full"><img class="w-full rounded-2xl" src="${
         card.image || ""
       }" alt="image" />
        </figure>
         <div class='p-6'>
        <h2 class="font-semibold text-[25px] ">Features</h2>
        <ul class="list-decimal text-[#585858] pl-[20px]">
                       ${card.features
                         .map(
                           (feature) =>
                             `
                       <li>${feature}
                       </li>
                       `
                         )
                         .join("")}
                    </ul>
                    <hr class='my-4'>
                      <div class=''>
                    <div>
                        <h2 class='font-semibold mb-4 text-[25px]'>${
                          card.name
                        } </h2>
                        <div class='flex justify-between'>
                            <div class='flex items-center gap-2 text-[#585858]'>
                                <img src="./calendar_month_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                                <p> ${card.published_in}</p>
                            </div>
                            <div class="flex justify-end">
                                <button onclick="openModal(); my_modal_5.showModal()" class='btn rounded-full bg-[#fef7f7] border-none'> <img src="./Frame.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
                </div>
                   
       </div>
        
        `;
    selectedContainer.appendChild(aiDiv);
  });
};
const openModal = () => {
  //   console.log("open modal");
};
my_modal_5.showModal();

const seeAll = () => {
  isShowAll = true;
  loadData(isShowAll);
};
loadData();
