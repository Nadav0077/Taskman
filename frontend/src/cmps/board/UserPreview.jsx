
export function UserPreview({user}) {
    const prevName = sliceFullName(user.fullname)
    if(user.imgUrl==='http://some-img.jpg') user.imgUrl=''
    return (
            <div className="user-preview flex center content-center font-m ">
                {!user.imgUrl && prevName}
                {user.imgUrl && (<img src={user.imgUrl} alt="user"/>)}
            </div>
    )
}

function sliceFullName(fullname){
    let str= fullname.split(' ');
    str = str[0][0] + str[1][0];
    return str.toUpperCase();
}

