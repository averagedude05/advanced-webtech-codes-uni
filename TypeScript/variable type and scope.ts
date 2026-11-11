function scopecheck(username1:string):string{
    let username:string=username1;
    return `Hello ${username}`;
}
 //console.log(username);

let ans:string=scopecheck("Hello");
console.log(ans);
