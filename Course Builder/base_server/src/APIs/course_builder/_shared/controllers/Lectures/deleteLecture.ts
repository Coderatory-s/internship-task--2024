import Lecture from '../../models/addLecture.model';

const deleteLecture = async (req: any, res: any) => {
    const { _id } = req.params; 
    try {
        const deletedLecture = await Lecture.findByIdAndDelete(_id);

        if (!deletedLecture) {
            return res.status(404).send('No Lecture found to delete.');
        }

        res.json({ message: 'Lecture deleted successfully.', deletedLecture });
    } catch (error) {
        console.error(error); 
        res.status(500).send('Error deleting Lecture.');
    }
}

export default deleteLecture;
