import Gallery from "../gallery";
import AddPhotoForm from "../photo/add-photo/add-photo";
import "./user-collection.scss";

function UserCollection() {
  return (
    <div className="w-full h-full flex gap-0.5 max-sm:flex-col">
      {/* left menu */}
      <div className="px-1 w-1/12 max-sm:w-full min-w-[140px] bg-white  flex flex-col items-center space-y-4 pt-4">
        <div className="">Settings</div>
        <div className="">Profile</div>
        <div className="">Galerie</div>
        <div className="">Faq</div>
      </div>
      <div className="flex flex-col px-1 w-11/12 max-sm:w-full">
        {/* Add photo form */}
        <div className="w-full min-h-52 flex space-x-2 px-4 py-2 mb-2">
          {/* left : image block
          <div className="w-6/12">+IMG+</div>
          right : info block
          <div className="w-4/12">
            <h3>Adding form</h3>
          </div> */}
          <AddPhotoForm></AddPhotoForm>
        </div>
        {/* user collection */}
        <div className="w-full">
          <Gallery></Gallery>
        </div>
      </div>
    </div>
  );
}

export default UserCollection;
