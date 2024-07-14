export class User {
    /** @type {Number} */
    id;
    /** @type {Number} */
    volume;
    /** @type {Number} */
    time;
    /** @type {?Number} */
    experience;
    /** @type {?Number} */
    energy;

    constructor(props) {
        this.id = Number(props.id);
        this.volume = props.volume;
        this.time = props.time;
        this.experience = props.experience;
        this.energy = props.energy;
    }
}
