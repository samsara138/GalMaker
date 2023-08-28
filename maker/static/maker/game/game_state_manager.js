class GameState {
    constructor() {
        this.state_dict = {}
    }

    addChanges(changeList){
        for(let i = 0; i < changeList.length; i+=2){
            let key = changeList[i];
            let value = changeList[i+1];
            this.state_dict[key] = value;
        }
    }

    checkReq(reqList){
        for(let i = 0; i < reqList.length; i+=2){
            let key = reqList[i];
            let value = reqList[i+1];
            if(this.state_dict[key] != value){
                return false;
            }
        }
        return true;
  }
}
