import Lecture from '../../models/addLecture.model';

const getSingleLecture = async (req: any, res: any) => {
    const { _id } = req.params; 
    
    try {
        const lecture = await Lecture.findById(_id);

        if (!lecture) {
            return res.status(404).send('No lecture found.');
        }

        res.json(lecture);
    } catch (error) {
        console.error(error); 
        res.status(500).send('Error fetching lecture.');
    }
}

export default getSingleLecture;
