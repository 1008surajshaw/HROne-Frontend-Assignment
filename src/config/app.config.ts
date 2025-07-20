type AppConfigType = {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfigType = {
    name: "Sample App",
    github: {
        title: "HrOne Frontend Assignment",
        url: "https://github.com/1008surajshaw/HROne-Frontend-Assignment",
    },
    author: {
        name: "suraj",
        url: "https://github.com/1008surajshaw",
    }
}

