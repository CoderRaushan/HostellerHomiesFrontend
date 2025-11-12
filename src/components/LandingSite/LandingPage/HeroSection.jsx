// // // import { Link } from "react-router-dom";
// // // import { Swiper, SwiperSlide } from "swiper/react";
// // // import { Autoplay, Pagination, Navigation } from "swiper/modules";
// // // import "swiper/css";
// // // import "swiper/css/pagination";
// // // import "swiper/css/navigation";

// // // function HeroSection() {
// // //   const slides = [
// // //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/1h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/2h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/3h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/4h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/5h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/6h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/7h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/8h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/9h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/11h.jpg",
// // //    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/12h.jpg"
// // //   ];

// // //   return (
// // //     <main className="min-h-screen bg-white">
// // //       {/* Swiper Slider - Smaller Height with Responsive Adjustment */}
// // //       <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] mt-[3.4rem]">
// // //         <Swiper
// // //           spaceBetween={30}
// // //           centeredSlides={true}
// // //           autoplay={{
// // //             delay: 2500,
// // //             disableOnInteraction: false,
// // //           }}
// // //           pagination={{
// // //             clickable: true,
// // //           }}
// // //           navigation={true}
// // //           modules={[Autoplay, Pagination, Navigation]}
// // //           className="mySwiper w-full h-full"
// // //         >
// // //           {slides.map((url, index) => (
// // //             <SwiperSlide key={index}>
// // //               <img
// // //                 src={url}
// // //                 alt={`Slide ${index + 1}`}
// // //                 className="w-full h-full object-cover mt-7"
// // //               />
// // //             </SwiperSlide>   
// // //           ))}
// // //         </Swiper>
// // //       </div>

// // //       {/* Content Below Slider */}
// // //       <div className="bg-white text-black p-10">
// // //         <div className="text-center">
// // //           <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">
// // //             Hosteller<span className="text-[#4f46e5]">Homies</span>
// // //           </h1>

// // //           <p className="py-2 text-lg sm:text-xl md:text-2xl">
// // //             One Solution For All Of The Hostel&apos;s Needs
// // //           </p>
// // //           {/* <div className="">
// // //             <Link
// // //               to="/auth/login"
// // //               className="bg-[#4f46e5] text-white py-3 px-12 sm:px-16 md:px-20 hover:bg-blue-700 transition rounded text-lg sm:text-xl md:text-2xl"
// // //             >
// // //               Login
// // //             </Link>
// // //             <p className="mt-6 mb-3">OR</p>
// // //             <Link
// // //               to="/auth/request"
// // //               className="text-lg sm:text-xl md:text-2xl hover:underline hover:text-blue-500"
// // //             >
// // //               Request Registration
// // //             </Link>
// // //           </div> */}
         
// // //           <div className="text-lg sm:text-xl md:text-2xl flex flex-col items-start mx-auto w-fit py-3 max-w-[90vw] break-words">
// // //             <span>AdminEmail: admin@gmail.com</span>
// // //             <span>AdminPassword: 123456789</span>
// // //             <hr className="w-full my-2" />
// // //             <span>UserEmail: utkarsh@gmail.com</span>
// // //             <span>UserPassword: 123456789</span>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </main>
// // //   );
// // // }

// // // export { HeroSection };

// // import { Link } from "react-router-dom";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Autoplay, Pagination, Navigation } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/pagination";
// // import "swiper/css/navigation";

// // function HeroSection() {
// //   const slides = [
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/1h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/2h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/3h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/4h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/5h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/6h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/7h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/8h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/9h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/11h.jpg",
// //     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/12h.jpg"
// //   ];

// //   return (
// //     <main className="min-h-screen bg-white">
// //       {/* Swiper Section */}
// //       <div className="relative w-full h-screen mt-[3.4rem]">
// //         <Swiper
// //           spaceBetween={30}
// //           centeredSlides={true}
// //           autoplay={{
// //             delay: 2500,
// //             disableOnInteraction: false,
// //           }}
// //           pagination={{
// //             clickable: true,
// //           }}
// //           navigation={true}
// //           modules={[Autoplay, Pagination, Navigation]}
// //           className="mySwiper w-full h-full"
// //         >
// //           {slides.map((url, index) => (
// //             <SwiperSlide key={index}>
// //               <div className="w-full h-full flex items-center justify-center bg-black">
// //                 <img
// //                   src={url}
// //                   alt={`Slide ${index + 1}`}
// //                   className="max-w-full max-h-full object-contain rounded-lg shadow-lg transition-all duration-700"
// //                 />
// //               </div>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
// //       </div>

// //       {/* Content Section */}
// //       <div className="bg-white text-black p-10">
// //         <div className="text-center">
// //           <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">
// //             Hosteller<span className="text-[#4f46e5]">Homies</span>
// //           </h1>

// //           <p className="py-2 text-lg sm:text-xl md:text-2xl">
// //             One Solution For All Of The Hostel&apos;s Needs
// //           </p>

// //           <div className="text-lg sm:text-xl md:text-2xl flex flex-col items-start mx-auto w-fit py-3 max-w-[90vw] break-words">
// //             <span>AdminEmail: admin@gmail.com</span>
// //             <span>AdminPassword: 123456789</span>
// //             <hr className="w-full my-2" />
// //             <span>UserEmail: utkarsh@gmail.com</span>
// //             <span>UserPassword: 123456789</span>
// //           </div>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }

// // export { HeroSection };

// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// function HeroSection() {
//   const slides = [
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/1h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/2h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/3h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/4h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/5h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/6h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/7h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/8h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/9h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/11h.jpg",
//     "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/12h.jpg"
//   ];

//   return (
//     <main className="min-h-screen bg-white">
//       {/* Swiper Section */}
//       <div className="relative w-full h-screen mt-[3.4rem]">
//         <Swiper
//           spaceBetween={30}
//           centeredSlides={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           navigation={true}
//           modules={[Autoplay, Pagination, Navigation]}
//           className="mySwiper w-full h-full"
//         >
//           {slides.map((url, index) => (
//             <SwiperSlide key={index}>
//               <img
//                 src={url}
//                 alt={`Slide ${index + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Content Section */}
//       <div className="bg-white text-black p-10">
//         <div className="text-center">
//           <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">
//             Hosteller<span className="text-[#4f46e5]">Homies</span>
//           </h1>

//           <p className="py-2 text-lg sm:text-xl md:text-2xl">
//             One Solution For All Of The Hostel&apos;s Needs
//           </p>

//           <div className="text-lg sm:text-xl md:text-2xl flex flex-col items-start mx-auto w-fit py-3 max-w-[90vw] break-words">
//             <span>AdminEmail: admin@gmail.com</span>
//             <span>AdminPassword: 123456789</span>
//             <hr className="w-full my-2" />
//             <span>UserEmail: utkarsh@gmail.com</span>
//             <span>UserPassword: 123456789</span>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export { HeroSection };

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HeroSection() {
  const slides = [
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/1h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/2h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/3h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/4h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/5h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/6h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/7h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/8h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/9h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/11h.jpg",
    "https://raw.githubusercontent.com/CoderRaushan/HostellerHomies/refs/heads/main/client/public/pictures/12h.jpg"
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Swiper Section */}
      <div className="relative w-full h-[80vh] sm:h-[90vh] md:h-screen mt-[80px]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper w-full h-full"
        >
          {slides.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Section */}
      <div className="bg-white text-black px-6 sm:px-10 py-8 sm:py-12">
        <div className="text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl leading-tight">
            Hosteller<span className="text-[#4f46e5]">Homies</span>
          </h1>

          <p className="py-3 text-base sm:text-lg md:text-2xl">
            One Solution For All Of The Hostel&apos;s Needs
          </p>

          <div className="text-sm sm:text-lg md:text-xl flex flex-col items-start mx-auto w-fit py-3 max-w-[90vw] break-words">
            <span><strong>Admin Email:</strong> admin@gmail.com</span>
            <span><strong>Admin Password:</strong> 123456789</span>
            <hr className="w-full my-2 border-gray-300" />
            <span><strong>User Email:</strong> utkarsh@gmail.com</span>
            <span><strong>User Password:</strong> 123456789</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export { HeroSection };
