const API_URL = "http://localhost:5500/api/posts"; // Update if deployed

document.addEventListener("DOMContentLoaded", () => {
    fetchPosts();
    
    const postForm = document.getElementById("postForm");
    postForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await createPost();
    });
});

async function fetchPosts() {
    try {
        const response = await fetch(API_URL);
        const posts = await response.json();
        const postList = document.getElementById("postList");
        postList.innerHTML = ""; // Clear existing list

        posts.forEach((post) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${post.name}</strong> - ${post.bloodGroup} <br>
                Location: ${post.location} <br>
                Contact: ${post.contact} <br>
                <button class="delete-btn" onclick="deletePost('${post._id}')">Delete</button>
            `;
            postList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

async function createPost() {
    const name = document.getElementById("name").value;
    const bloodGroup = document.getElementById("bloodGroup").value;
    const location = document.getElementById("location").value;
    const contact = document.getElementById("contact").value;

    if (!name || !bloodGroup || !location || !contact) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, bloodGroup, location, contact })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            document.getElementById("postForm").reset();
            fetchPosts(); // Refresh list
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error creating post:", error);
    }
}

async function deletePost(id) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            fetchPosts();
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}
