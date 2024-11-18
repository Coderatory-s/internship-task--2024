import {CourseModel} from '../models/course'

export default {
    post_data: async (body: any) => {
        console.log(body)

        const a = await new CourseModel({
            CV: body.CV
        })
        let s = await a.save()
        return s
    }
}
