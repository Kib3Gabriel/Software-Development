// const calcScore = (rolls) => {
//     let score = 0;
//     let frameIndex = 0; // Only declare frameIndex once
    
//     for (let frame = 0; frame < 10; frame++) {
//         const firstRoll = rolls[frameIndex];

//         if(firstRoll ===10){
//             // strike. Player scores 10 points for that frame plus a bonus of the next two rolls
//             score += 10 + rolls[frameIndex +1] + rolls[frameIndex + 2];
//             frameIndex++;
//         }else{
//             const secondRoll = rolls[frameIndex + 1];
        
//              score += firstRoll + secondRoll;
        
//             if (firstRoll + secondRoll === 10) {
//                  // Spare bonus (add the next roll)
//                 score += rolls[frameIndex + 2];
//         }
        
//             frameIndex += 2; // Move to the next frame (two rolls per frame)
            
//         }
        
//     }
    
//     return score;
// };

// export { calcScore };


const calcScore = (rolls) => {
    let score = 0;
    let frameIndex = 0; // Keep track of the current frame

    for (let frame = 0; frame < 10; frame++) {
        const firstRoll = rolls[frameIndex];
        
        // Handle Strike (10 pins in the first roll)
        if (firstRoll === 10) {
            // Strike bonus: Add next two rolls
            if (rolls[frameIndex + 1] !== undefined && rolls[frameIndex + 2] !== undefined) {
                score += 10 + rolls[frameIndex + 1] + rolls[frameIndex + 2];
            }
            frameIndex++; // Only 1 roll in the strike frame
        } else {
            // Handle the case where there's no strike
            const secondRoll = rolls[frameIndex + 1];

            // Regular frame score
            if (secondRoll !== undefined) {
                score += firstRoll + secondRoll;
            }

            // Handle Spare (if the two rolls sum to 10)
            if (firstRoll + secondRoll === 10) {
                if (rolls[frameIndex + 2] !== undefined) {
                    score += rolls[frameIndex + 2]; // Add next roll as bonus
                }
            }

            frameIndex += 2; // Move to the next frame (2 rolls per frame)
        }
    }

    return score;
};

export { calcScore };
