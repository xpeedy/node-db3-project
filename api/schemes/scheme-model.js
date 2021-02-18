// scheme-model
const db = require("../../data/db-config")

module.exports = {
    find() {
        return db("scheme")
    },
    findById(id) {
        return db("scheme")
        .where("id",id)
        .first()

    },
    findSteps(id){
        return db("scheme as s")
        .join("steps as st","st.scheme_id","st.step_number","s.id")
        .select("st.id as StID", "s.scheme_name","st.instruction")
        .where("s.id", id)
    },
    add(scheme) {
        return db("scheme")
        .insert(scheme)
        .then(([id]) => {
            return db("scheme")
            .where("id", id)
            .first()
        })
    },
    update(changes, id) {
        const changesId = id
        return db("scheme")
        .where("id",id).update(changes)
        .then(() => {
            return db("scheme")
            .where("id",changesId)
            .first()
        })
    },
    remove(id) {
        return db("scheme")
        .where("id",id).del()
        .then(() => {
            return db("scheme")
        })
    }

}