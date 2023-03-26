/* I origianlly had a problem when rendering the radio button color text inside
the color when getting black
*/

/*i solved that like this <label class="label--radio" style="background-color:${color}" for="color--${color}${index}"> <span style="color:${
                color === "black" ? "white" : "black"
              }" }>${color} </span></label>`
            )


*/

/* But it didnt take me long to realise that i would have the same
 problem with a ton of dark colors, so i looked for a way to dynamically render a 
 color based on the background color and asked chat-gpt which found a solution for me
 i understand the code but i wanted to mark that his code is gotten from chat-gpt 
*/

// CODE GOTTEN FROM CHAT-GPT

export function getContrastColor(hexColor) {
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  // Calculate brightness value of background color
  const brightness = (r + g + b) / 3;
  console.log("code ran");
  // If the brightness value is less than 128, use white text; otherwise, use black text
  return brightness < 128 ? "#FFFFFF" : "#000000";
}
