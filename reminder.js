export class Reminder {
    constructor(date, desc, color, id)
    {
        this.date = date;
        this.desc = desc;
        this.color = color;
        this.id = id;
    }

    getDate()
    {
        return this.date;
    }

    getDesc()
    {
        return this.desc;
    }

    getColor()
    {
        return this.color;
    }

    getID()
    {
        return this.id;
    }
    
    setDate(date)
    {
        this.date = date;
    }

    setDesc(desc)
    {
        this.desc = desc;
    }

    setColor(color)
    {
        this.color = color;
    }

}