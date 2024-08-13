import axios from "axios";

const updateCounter = async (counter: number, allItems: string | any[], counterKey: string, userId: string) => {
    
    counter = (counter >= allItems.length - 1) ? 0 : ++counter;

    let response = await axios.patch('/api/v1/admin/users/update/prefs', {
        "prefs": {
            [counterKey]: counter.toString()
        },
        "id": userId
    });
    return counter;
};

export default updateCounter