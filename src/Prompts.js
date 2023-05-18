
const prompts = ["Recommend six books for me to read",
                "Suggest six books for me to read",
                "Tell six books for me to read",
                "Recommend six books to read",
                "Suggest six books to read",
                "Tell six books to read",
                "Could you recommend six books for me to read",
                "Could you suggest six books for me to read",
                "Could you tell six books for me to read",
                "Could you recommend six books to read",
                "Could you suggest six books to read",
                "Could you suggest six books to read"]

const json_prompts = ["Reply in json format",
                    "Write response in json format",
                    "Answer in json format",
                    "Reply in json format with details like 'title'",
                    "Write response in json format with details like 'title'",
                    "Answer in json format with details like 'title'"]

export default function create_prompt(likes, dislikes, neutrals, genres) {
    const i = Math.floor(Math.random() * prompts.length);
    const j = Math.floor(Math.random() * json_prompts.length);
    let prompt = prompts[i]

    if (genres.length > 0) {
        prompt = prompt + ". I like books from these genres - "
        for (let k in genres) {
            prompt = prompt + " " + genres[k] + ", "
        }
    }

    if (likes.length > 0) {
        prompt = prompt + ". I like"
        for (let k in likes) {
            prompt = prompt + " " + likes[k] + ", "
        }
    }

    if (dislikes.length > 0) {
        prompt = prompt + ". I don't like"
        for (let k in dislikes) {
            prompt = prompt + " " + dislikes[k] + ", "
        }
    }

    if (neutrals.length > 0) {
        prompt = prompt + ". Books other than "
        for (let k in neutrals) {
            prompt = prompt + " " + neutrals[k] + ", "
        }
    }

    prompt = prompt + ". " + json_prompts[j]
    return prompt
}