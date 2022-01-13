import User from "../models/User.js"
import Note from "../models/Note.js"
import sequelize from "../utils/database.js"

async function getNote(Username, id) {

    const t = await sequelize.transaction();
    let note;
    try {
        if (Username == "admin") {
            note = await Note.findAll(
                {
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                    offset: id,
                },
                { transaction: t });
            if (note[0] === null) {
                return null;
            }

        } else {
            const user = await User.findOne({ where: { username: Username } },
                { transaction: t });

            note = await Note.findAll(
                {
                    where: {
                        userId: user.id
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                    offset: id,
                }, { transaction: t });
            if (user === null || note[0] === null) {
                return null;
            }

        }

        return note[0].text;


    } catch {
        await t.rollback();
        return null;
    }
}

export default getNote;