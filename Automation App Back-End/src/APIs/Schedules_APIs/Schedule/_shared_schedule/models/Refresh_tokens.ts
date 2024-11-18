
import mongoose , {Schema} from 'mongoose';

interface tokens {
     auth_id : String;
     refresh_token : String
};

const tokendb : Schema<tokens> = new mongoose.Schema({
    auth_id : {
         type : String,
         require : true
    },
    refresh_token : {
         type : String,
         require : true
    }
});

export default mongoose.model<tokens>('TokenDB', tokendb);
