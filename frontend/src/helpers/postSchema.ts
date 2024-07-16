import * as Yup from "yup"

export const postSchema=Yup.object().shape({
    title:Yup.string().required(),
    description:Yup.string().required()
})