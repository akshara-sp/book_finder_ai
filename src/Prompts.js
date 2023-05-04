
const prompts = ["Recommend ten books for me to read",
                "Suggest ten books for me to read",
                "Tell ten books for me to read",
                "Recommend ten books to read",
                "Suggest ten books to read",
                "Tell ten books to read",
                "Could you recommend ten books for me to read",
                "Could you suggest ten books for me to read",
                "Could you tell ten books for me to read",
                "Could you recommend ten books to read",
                "Could you suggest ten books to read",
                "Could you suggest ten books to read"]

const json_prompts = ["Reply in json format",
                    "Write response in json format",
                    "Answer in json format",
                    "Reply in json format with details like 'title'",
                    "Write response in json format with details like 'title'",
                    "Answer in json format with details like 'title'"]

export default function create_prompt(likes, dislikes, neutrals) {
    const i = Math.floor(Math.random() * prompts.length);
    const j = Math.floor(Math.random() * json_prompts.length);
    let prompt = prompts[i]

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