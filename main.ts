const imgPath = "broccoli.png";

interface BroccoliDetails {
    id: string,
    x: number,
    y: number
}

interface BroccoliDetailsToSort extends BroccoliDetails {
    distance: number
}

function createImg(details: BroccoliDetails) {
    const elem = document.createElement("img");
    elem.setAttribute("src", imgPath);
    elem.setAttribute("height", "200");
    elem.setAttribute("width", "200");
    elem.setAttribute("id", details.id);
    elem.style.position = "absolute";
    elem.style.marginLeft = `${details.x-100}px`;
    elem.style.marginTop = `${details.y-100}px`;
    return elem;
}

window.onmousedown = function(e: MouseEvent) {
    const myBroccoliList = (window as any).myBroccoliList as BroccoliDetails[] || [];
    if (e.button == 0) {

        // Left clicked: add a broccoli
        const newId = e.timeStamp.toString();
        const newBroccoliDetails: BroccoliDetails = {
            id: newId,
            x: e.x,
            y: e.y
        }
        const img = createImg(newBroccoliDetails);
        document.getElementById("container").appendChild(img);
        myBroccoliList.push(newBroccoliDetails);

        console.log(`${newBroccoliDetails.id} is added to the screen at ${newBroccoliDetails.x}:${newBroccoliDetails.y}`)
    } else {

        if (myBroccoliList.length < 1) {
            return;
        }

        // Right clicked: remove a broccoli
        const arrayToSort = myBroccoliList.map(broccoli => {
            const newBroccoli = (broccoli as BroccoliDetailsToSort);
            newBroccoli.distance = Math.pow(broccoli.x - e.x, 2) + Math.pow(broccoli.y - e.y, 2);
            return newBroccoli;
        });

        arrayToSort.sort((left, right) => {
            return left.distance - right.distance;
        })

        const toRemoveBroccoli = arrayToSort[0];
        document.getElementById(toRemoveBroccoli.id).remove();

        myBroccoliList.splice(myBroccoliList.indexOf(toRemoveBroccoli as BroccoliDetails), 1);

        console.log(`${toRemoveBroccoli.id} is removed from the screen`)
    }
    
    (window as any).myBroccoliList = myBroccoliList;
}