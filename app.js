API_URL =
  "https://api.onsign.tv/dev-challenge/?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODE5NjgyNjEsInN1YiI6ImRldi1jaGFsbGVuZ2UifQ.44F6U0ZsWm3pgIoF5GE6chAbohS0V-iswevneJerCC8";

let userData = [];
let isAscending = [];

async function fetchData(retries = 3) {
  try {
    const response = await fetch(API_URL);

    if (response.status !== 200) {
      throw new error(response.status);
    }

    const data = await response.json();
    console.log(data);
    processAndRender(data);
  } catch (error) {
    console.log(error);
  }
}

function processAndRender(data) {
  const { users, friends, interests } = data;

  userMap = new Map(
    users.map((u) => [
      u.id,
      { ...u, userDirectFriends: [], userInterests: [] },
    ]),
  );

  friends.forEach(([friendId1, friendId2]) => {
    userMap.get(friendId1).userDirectFriends.push(friendId2);
    userMap.get(friendId2).userDirectFriends.push(friendId1);
  });

  Object.keys(interests).forEach((interestName) => {
    interests[interestName].forEach((userId) => {
      userMap.get(userId).userInterests.push(interestName);
    });
  });

  userData = users.map((user) => {
    const profile = userMap.get(user.id);

    let suggestedFriends = new Set();

    profile.userDirectFriends.forEach((friendId) => {
      const friendProfile = userMap.get(friendId);

      friendProfile.userDirectFriends.forEach((suggestedFriendId) => {
        const isCurrentUser = suggestedFriendId === user.id;
        const alreadyFriend =
          profile.userDirectFriends.includes(suggestedFriendId);

        if (!isCurrentUser && !alreadyFriend) {
          suggestedFriends.add(userMap.get(suggestedFriendId).name);
        }
      });
    });

    let suggestedInterests = new Set();
    profile.userDirectFriends.forEach((friendId) => {
      userMap.get(friendId).userInterests.forEach((interest) => {
        if (!profile.userInterests.includes(interest)) {
          suggestedInterests.add(interest);
        }
      });
    });

    return {
      ...user,
      suggestedFriends: Array.from(suggestedFriends).join(", "),
      suggestedInterests: Array.from(suggestedInterests).join(", "),
    };
  });

  renderTable();
}

function renderTable() {
  const tableBody = document.getElementById("tableBody");

  const sorted = [...userData].sort((a, b) => {
    return isAscending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  tableBody.innerHTML = sorted
    .map(
      (user) =>
        `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.suggestedFriends || "No suggested friends available"}</td>
        <td>${user.suggestedInterests || "No suggested interests available"}</td>
      </tr>
    `,
    )
    .join("");
}

document.getElementById("sortBtn").addEventListener("click", () => {
  isAscending = !isAscending;
  document.getElementById("sortBtn").innerText =
    `Sort: Name ${isAscending ? "A-Z" : "Z-A"}`;
  renderTable();
});

fetchData();
