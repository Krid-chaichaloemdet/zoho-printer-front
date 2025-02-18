import { useEffect, useState } from "react";
import axios from "axios";
import { removeAccessToken } from "./utils/local-storage";
import LoadingPage from "../component/LoadingPage";

import { IoMdRefreshCircle } from "react-icons/io";
import { PiPrinterBold } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { useAuth } from "./hooks/use-auth";
import { LuLoader } from "react-icons/lu";
import { BsCloudDownload } from "react-icons/bs";

function AdminWorkPage() {
  const { adminInfo } = useAuth();
  const [isOnHover, setIsOnHover] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [adminUsername, setAdminusername] = useState(false);

  useEffect(() => {
    if (adminInfo) {
      setAdminusername(adminInfo.username);
    }
  }, []);
  const [hoverInfo, setHoverInfo] = useState([]);
  const [hoverPrintButtonInfo1, setHoverPrintButtonInfo1] = useState(false);
  const [hoverPrintButtonInfo2, setHoverPrintButtonInfo2] = useState(false);

  const [readAll, setReadAll] = useState([]);
  const [isOpenReadAll, setIsOpenReadAll] = useState(true);

  const [readPendingProduction, setReadPendingProduction] = useState([]);
  const [isOpenReadPendingPro, setIsOpenReadPendingPro] = useState(false);

  const [readInProduction, setReadInProduction] = useState([]);
  const [isOpenReadInProduction, setIsOpenInProduction] = useState(false);

  const [readDelivering, setReadDelivering] = useState([]);
  const [isOpenReadDelivering, setIsOpenReadDelivering] = useState(false);

  const [readCompleted, setReadCompleted] = useState([]);
  const [isOpenReadCompleted, setIsOpenReadCompleted] = useState(false);

  const [readPendingDelivery, setReadPendingDelivery] = useState([]);
  const [isOpenReadPendingDelivery, setIsOpenReadPendingDelivery] =
    useState(false);

  const [searchRender, setSearchRender] = useState([]);
  const [isOpenSearchRender, setIsOpenSearchRender] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isOpenMultiManyPagePrinter, setIsOpenMultiManyPagePrinter] =
    useState(false);
  const [isOpenMultiInOnePagePrinter, setIsOpenMultiInOnePagePrinter] =
    useState(false);

  const [zoomImage, setZoomImage] = useState(null);
  const [isOpenZoom, setIsOpenZoom] = useState(false);
  const [printerPageData, setPrinterPageData] = useState([]);

  const [readCopletedOrder, setReadCompletedOrder] = useState("0");
  const [readDeliveringOrder, setReadDiliveringOrder] = useState("0");
  const [readPendingProductionOrder, setPendingProductionOrder] = useState("0");
  const [readInProductionOrder, setReadInProductionOrder] = useState("0");
  const [readPendingDeliveryOrder, setReadPendingDeliveryOrder] = useState("0");

  const [isOpenErrorNotSelectItem, setIsOpenErrorNotSelectItem] =
    useState(false);

  const [popupData, setPopupData] = useState({});

  const [isCooldown, setIsCooldown] = useState(true);
  const [countCooldown, setCountCooldown] = useState("0");
  useEffect(() => {
    axios
      .get("http://192.168.0.169:7777/adminZoho/readCompleteStatus")
      .then((res) => {
        return setReadCompletedOrder(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://192.168.0.169:7777/adminZoho/readDeliveringStatus")
      .then((res) => {
        return setReadDiliveringOrder(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://192.168.0.169:7777/adminZoho/readPendingProductionStatus")
      .then((res) => {
        return setPendingProductionOrder(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://192.168.0.169:7777/adminZoho/readInProductionStatus")
      .then((res) => {
        return setReadInProductionOrder(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://192.168.0.169:7777/adminZoho/readPendingDeliveryStatus")
      .then((res) => {
        return setReadPendingDeliveryOrder(res.data);
      })
      .catch((err) => console.log(err));
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    let loadData = axios
      .get("http://192.168.0.169:7777/admin/readAll")
      .then((res) => {
        if (!localStorage.ACCESS_TOKEN) {
          window.location.href = "/";
        }
        setIsOpenReadAll(true);
        setReadAll(res.data);
      });
    if (loadData) {
      setLoading(false);
    }
  }, []);

  const readAllStatus = async () => {
    setLoading(true);
    await axios
      .get("http://192.168.0.169:7777/admin/readAll")
      .then((res) => {
        return setReadAll(res.data);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const pendingProductionStatus = async () => {
    setLoading(true);
    await axios
      .get("http://192.168.0.169:7777/admin/readPendingProduction")
      .then((res) => setReadPendingProduction(res.data))
      .then(() => console.log("first"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const inProductionStatus = async () => {
    setLoading(true);
    await axios
      .get("http://192.168.0.169:7777/admin/readInProduction")
      .then((res) => setReadInProduction(res.data))
      .then(() => console.log("first"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const pendingDeliveryStatus = async () => {
    await axios
      .get("http://192.168.0.169:7777/admin/readPendingDelivery")
      .then((res) => setReadPendingDelivery(res.data))
      .then(() => console.log("first"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const deliveringStatus = async () => {
    setLoading(true);
    await axios
      .get("http://192.168.0.169:7777/admin/readDelivering")
      .then((res) => setReadDelivering(res.data))
      .then(() => console.log("first"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const completedStatus = async () => {
    setLoading(true);
    await axios
      .get("http://192.168.0.169:7777/admin/readCompleted")
      .then((res) => setReadCompleted(res.data))
      .then(() => console.log("first"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const searchAll = async (data) => {
    await axios
      .get(`http://192.168.0.169:7777/admin/search?q=${data}`)
      .then((res) => {
        setSearchRender(res.data);
      });
  };
  const getApiFromZoho = async () => {
    setLoading(true);
    setIsCooldown(false);
    let uploadResult = await axios
      .get("http://192.168.0.169:7777/adminZoho/addZohoData")
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
    if (uploadResult) {
      readAllStatus();
      setLoading(false);
    }
    setTimeout(() => {
      setIsCooldown(true);
    }, [90000]);
  };

  const logout = async () => {
    removeAccessToken();
    await axios.post("http://192.168.0.169:7777/admin/logoutAdmin", adminInfo);
    window.location.href = "/";
  };

  const selectImageToPrint = (data) => {
    //////
    let index = printerPageData.findIndex((obj) => obj.OrderId == data.OrderId);
    if (index == -1) {
      printerPageData.push(data);

      setPrinterPageData(printerPageData);
    }
    if (index >= 0) {
      printerPageData.splice(index, 1);
    }
  };
  const printMutiOrderInManyPage = () => {
    if (!printerPageData[0]) {
      return setIsOpenErrorNotSelectItem(true);
    }

    setIsOpenStatusDropDown(false);
    setSelectRow(false);
    setIsOpenMultiManyPagePrinter(true);
    setTimeout(() => {
      window.print();
      window.location.href = "adminWorkPage";
    }, [1000]);
    return;
  };
  const printMultiOrderInOnePage = () => {
    if (!printerPageData[0]) {
      return setIsOpenErrorNotSelectItem(true);
    }

    setIsOpenStatusDropDown(false);
    setSelectRow(false);
    setIsOpenMultiInOnePagePrinter(true);
    setTimeout(() => {
      console.log(printerPageData);
      window.print();
      window.location.href = "adminWorkPage";
    }, [1000]);
    return;
  };

  const [selectRow, setSelectRow] = useState(false);
  const [selectIdRow, setSelectIdRow] = useState(false);

  const [isOpenStatusDropDown, setIsOpenStatusDropDown] = useState(false);
  const [updatePrintStatus, setUpdatePrintStatus] = useState(null);

  const [searchDate, setSearchDate] = useState(false);
  const searchByDate = async (e) => {
    let listOfMonth = [
      { id: "01", mm: "Jan" },
      { id: "02", mm: "Feb" },
      { id: "03", mm: "Mar" },
      { id: "04", mm: "Apr" },
      { id: "05", mm: "May" },
      { id: "06", mm: "Jun" },
      { id: "07", mm: "Jul" },
      { id: "08", mm: "Aug" },
      { id: "09", mm: "Sep" },
      { id: "10", mm: "Oct" },
      { id: "11", mm: "Nov" },
      { id: "12", mm: "Dec" },
    ];

    let day = e.target.value.slice(-2);
    let month = e.target.value.slice(5, 7);
    let year = e.target.value.slice(0, 4);

    let afterFilterMonth = listOfMonth.filter((data) => data.id == month);

    let yearMonthDay = day + "-" + afterFilterMonth[0].mm + "-" + year;
    setIsOpenReadPendingPro(false);
    setIsOpenReadAll(false);
    setIsOpenInProduction(false);
    setIsOpenReadDelivering(false);
    setIsOpenReadCompleted(false);
    setIsOpenReadPendingDelivery(false);
    setSearchDate(yearMonthDay);
    setIsOpenSearchRender(true);
    await axios
      .get(`http://192.168.0.169:7777/admin/search?q=${yearMonthDay}`)
      .then((res) => {
        setSearchRender(res.data);
      });
  };

  return (
    <div className=" max-h-screen overflow-y-hidden w-screen ">
      {isOpenMultiManyPagePrinter && (
        <div className="w-screen h-screen gap-2  absolute z-20 bg-white ">
          {printerPageData?.map((data, i) => (
            <div
              key={i}
              className="h-screen w-screen  flex justify-center flex-col border- border-black relative"
            >
              <div className="mt-[40px] ml-[40px]  mr-[40px] mb-[40px] h-screen border-2 border-black justify-center relative divide-y-2 divide-black">
                <div className="h-[152px] w-[100%] flex flex-row">
                  <div className="h-[100%] w-[80%]">
                    <div className="size-auto my-2 mx-4">
                      <div className="font-extrabold text-[23px] flex flex-row">
                        <p>ผู้ส่ง(From):</p>
                        <p className="indent-1">วสนธ์</p>
                      </div>
                      <div className="text-[23px]">
                        <p>Tel. 0815469816</p>
                        <p>
                          287/2 ถนนสุขาภิบาล 5 เเขวงท่าเเร้ง เขตบางเขน
                          กรุงเทพมหานคร 10220
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="h-[152px] w-[152px] outline outline-2 absolute right-0 flex p-1">
                    {" "}
                    {
                      <img
                        src={
                          `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=` +
                          `http://192.168.0.169:5174/images/${data.Image}.jpg`
                        }
                        alt=""
                      />
                    }
                  </div>
                </div>
                <div className="h-[188px] w-[100%]">
                  <div className="size-auto my-2 mx-4 absolute">
                    <div className="font-extrabold text-[23px] flex flex-row">
                      <p>ผู้รับ(To):</p>
                      <p className="indent-1">{data.Recipient}</p>
                    </div>
                    <div className="text-[23px]">
                      <p>Tel. {data.Address_Details.slice(-10)}</p>
                      <p>{data.Address_Details}</p>
                    </div>
                  </div>
                  <div className="h-[40px] min-w-[152px] pr-2 pl-2 absolute right-0 outline outline-2 flex justify-center items-center">
                    <p className="text-[23px] font-extrabold">{data.Address}</p>
                  </div>
                </div>
                <div className=" w-[100%] divide-y-2 divide-black">
                  <div className="h-[40px] w-[100%] flex flex-row ">
                    <div className="h-[100%] w-[5%] flex items-center justify-center">
                      <p className="text-[16px] font-extrabold">#</p>
                    </div>
                    <div className="h-[100%] w-[55%] flex items-center justify-start indent-4">
                      <p className="text-[16px] font-extrabold">ชื่อสินค้า</p>
                    </div>
                    <div className="h-[100%] w-[20%] flex items-center justify-center">
                      <p className="text-[16px] font-extrabold">Material</p>
                    </div>
                    <div className="h-[100%] w-[20%] flex items-center justify-center">
                      <p className="text-[16px] font-extrabold">Quantity</p>
                    </div>
                  </div>
                </div>
                <div className=" w-[100%] divide-y-2 divide-black">
                  <div className="h-[40px] w-[100%] flex flex-row ">
                    <div className="h-[100%] w-[5%] flex items-center justify-center">
                      <p className="text-[16px] ">{1}</p>
                    </div>
                    <div className="h-[100%] w-[55%]  flex items-c justify-start indent-4">
                      <p className="text-[16px] w-[350px]  h-auto   break-words ">
                        {data.SKU_Artwork_File.slice(139)}
                      </p>
                    </div>
                    <div className="h-[100%] w-[20%] flex items-center justify-center">
                      <p className="text-[16px] ">{data.Material}</p>
                    </div>
                    <div className="h-[100%] w-[20%] flex items-center justify-center">
                      <p className="text-[16px] ">{data.Quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[40px] self-end flex justify-start absolute bottom-0">
                <p className="self-center mr-[60px] text-[16px] font-medium">
                  Shipping Date:{" "}
                  {new Date().toLocaleString("en-US", {
                    timeZone: "Asia/Bangkok",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpenMultiInOnePagePrinter && (
        <div className="w-screen h-screen gap-2  absolute z-20 bg-white ">
          <div className="h-screen w-screen  flex justify-center flex-col  border-black relative">
            <div className="mt-[40px] ml-[40px]  mr-[40px] mb-[40px] h-screen border-2 border-black justify-center relative divide-y-2 divide-black">
              <div className="h-[152px] w-[100%] flex flex-row">
                <div className="h-[100%] w-[80%]">
                  <div className="size-auto my-2 mx-4">
                    <div className="font-extrabold text-[23px] flex flex-row">
                      <p>ผู้ส่ง(From):</p>
                      <p className="indent-1">วสนธ์</p>
                    </div>
                    <div className="text-[23px]">
                      <p>Tel. 0815469816</p>
                      <p>
                        287/2 ถนนสุขาภิบาล 5 เเขวงท่าเเร้ง เขตบางเขน
                        กรุงเทพมหานคร 10220
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-[152px] w-[152px] outline outline-2 absolute right-0 flex p-1">
                  {" "}
                  <img
                    src={
                      `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=` +
                      `http://192.168.0.169:5174/images/${printerPageData[0].Image}.jpg`
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="h-[188px] w-[100%]">
                <div className="size-auto my-2 mx-4 absolute">
                  <div className="font-extrabold text-[23px] flex flex-row">
                    <p>ผู้รับ(To):</p>
                    <p className="indent-1">{printerPageData[0].Recipient}</p>
                  </div>
                  <div className="text-[23px]">
                    <p>Tel. {printerPageData[0].Address_Details.slice(-10)}</p>
                    <p>{printerPageData[0].Address_Details}</p>
                  </div>
                </div>
                <div className="h-[40px] min-w-[152px] pr-2 pl-2 absolute right-0 outline outline-2 flex justify-center items-center">
                  <p className="text-[23px] font-extrabold">
                    {printerPageData[0].Address}
                  </p>
                </div>
              </div>
              <div className=" w-[100%] divide-y-2 divide-black">
                <div className="h-[40px] w-[100%] flex flex-row ">
                  <div className="h-[100%] w-[5%] flex items-center justify-center">
                    <p className="text-[16px] font-extrabold">#</p>
                  </div>
                  <div className="h-[100%] w-[55%] flex items-center justify-start indent-4">
                    <p className="text-[16px] font-extrabold">ชื่อสินค้า</p>
                  </div>
                  <div className="h-[100%] w-[20%] flex items-center justify-center">
                    <p className="text-[16px] font-extrabold">Material</p>
                  </div>
                  <div className="h-[100%] w-[20%] flex items-center justify-center">
                    <p className="text-[16px] font-extrabold">Quantity</p>
                  </div>
                </div>
                {printerPageData?.map((data, i) => {
                  return (
                    <div key={i} className="h-[auto] w-[100%] flex flex-row ">
                      <div className="h-[100%] w-[5%] flex items-center justify-center">
                        <p className="text-[16px] ">{i + 1}</p>
                      </div>
                      <div className="h-[100%] w-[55%] flex items-center mx-16px">
                        <p className="text-[16px] w-[350px]  h-auto   break-words  ">
                          {data.SKU_Artwork_File.slice(139)}
                        </p>
                      </div>
                      <div className="h-[100%] w-[20%] flex items-center justify-center">
                        <p className="text-[16px] ">{data.Material}</p>
                      </div>
                      <div className="h-[100%] w-[20%] flex items-center justify-center">
                        <p className="text-[16px] ">{data.Quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="h-[40px] self-end flex justify-start absolute bottom-0">
              <p className="self-center mr-[60px] text-[16px] font-medium">
                Shipping Date:{" "}
                {new Date().toLocaleString("en-US", {
                  timeZone: "Asia/Bangkok",
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {isOpenZoom && (
        <div className="w-screen h-screen z-30 absolute bg-black bg-opacity-80 flex items-center justify-center ">
          <img
            className="z-30 max-w-screen-lg max-h-screen w-50 inset-0 "
            src={zoomImage}
          />
          <button onClick={() => setIsOpenZoom(false)}>
            <div className="absolute  text-7xl text-white  top-0 right-5">
              X
            </div>
          </button>
        </div>
      )}

      {isOpenErrorNotSelectItem && (
        <div className="w-screen h-screen z-20  absolute bg-black bg-opacity-40 flex  items-center justify-center ">
          <div className=" bg-black text-white rounded-md text-4xl w-[100vh] h-[50vh] flex flex-col items-end ">
            <div
              onClick={() => {
                setIsOpenErrorNotSelectItem(!isOpenErrorNotSelectItem);
              }}
              className="p-1 cursor-pointer text-6xl   -translate-x-2"
            >
              x
            </div>
            <div className="flex text-4xl -translate-y-5 w-full h-full items-center justify-center">
              <div>Please select an item you want to print !</div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex justify-between items-center gap-2 p-2">
          <div
            onClick={() => (window.location.href = "adminWorkPage")}
            className="  cursor-pointer "
          >
            <img
              className="w-40  pl-2 pt-2 pb-2"
              src={"public/Group 462.svg"}
              alt=""
            />
          </div>
          <div className="flex h-10">
            <div className="flex items-center gap-4">
              <IoSearchSharp className="p-1 border-2 bg-black border-black text-white w-10 h-[34px] shadow-md rounded-l-lg translate-x-[22px]" />
              <input
                placeholder="Search here..."
                className="border-[1px] rounded-md bg-gray-200 text-black pl-5 pt-1 pb-1 w-72 "
                onChange={(e) => {
                  searchAll(e.target.value);
                  setIsOpenReadPendingPro(false);
                  setIsOpenReadAll(false);
                  setIsOpenInProduction(false);
                  setIsOpenReadDelivering(false);
                  setIsOpenReadCompleted(false);
                  setIsOpenReadPendingDelivery(false);
                  setIsOpenSearchRender(true);
                }}
                type="text"
              />
              <div className="bg-gray-200 absolute translate-x-[210px]">
                {searchDate}
              </div>
              <input
                className="w-[20px] cursor-pointer absolute translate-x-[300px] bg-gray-200"
                onChange={searchByDate}
                type="date"
              />
              <button
                onClick={() => {
                  setIsOpenStatusDropDown(!isOpenStatusDropDown);
                }}
                className={` text-black w-[185px] border-2 border-black font-extrabold rounded-md p-1 shadow-xl ${
                  (isOpenReadAll && "bg-white") ||
                  (isOpenReadPendingPro && "bg-[#c9c9c9]") ||
                  (isOpenReadInProduction && "bg-[#ffbec2] ") ||
                  (isOpenReadPendingDelivery && "bg-[#fdcd91] ") ||
                  (isOpenReadDelivering && "bg-[#f9ed80]") ||
                  (isOpenReadCompleted && "bg-[#98d389]")
                }`}
              >
                {(isOpenReadAll && "All Status") ||
                  (isOpenReadPendingPro && "Pending Production") ||
                  (isOpenReadInProduction && "In Production") ||
                  (isOpenReadPendingDelivery && "Pending Delivery") ||
                  (isOpenReadDelivering && "Delivery") ||
                  (isOpenReadCompleted && "Completed") ||
                  "Status"}
              </button>
              {isOpenStatusDropDown && (
                <div className="bg-[#333333] p-1 rounded-md absolute z-20 flex flex-col translate-y-[129px] translate-x-[360px] shadow-2xl w-[185px] gap-1">
                  <button
                    onClick={() => {
                      setIsOpenReadPendingPro(false);
                      setIsOpenReadAll(true);
                      setIsOpenInProduction(false);
                      setIsOpenReadDelivering(false);
                      setIsOpenSearchRender(false);
                      setIsOpenReadCompleted(false);
                      setIsOpenReadPendingDelivery(false);
                      readAllStatus();
                      setIsOpenStatusDropDown(!isOpenStatusDropDown);
                    }}
                    className="bg-white  rounded-md p-1 hover:text-white hover:bg-black shadow-2xl"
                  >
                    All Status
                  </button>
                  <button
                    onClick={() => {
                      setIsOpenReadPendingPro(true);
                      setIsOpenReadAll(false);
                      setIsOpenInProduction(false);
                      setIsOpenReadDelivering(false);
                      setIsOpenSearchRender(false);
                      setIsOpenReadCompleted(false);
                      setIsOpenReadPendingDelivery(false);
                      setIsOpenStatusDropDown(!isOpenStatusDropDown);
                      pendingProductionStatus();
                    }}
                    className="bg-[#c9c9c9]  rounded-md p-1 hover:text-white hover:bg-gray-500"
                  >
                    Pending Production
                  </button>
                  <button
                    onClick={() => {
                      setIsOpenReadPendingPro(false);
                      setIsOpenReadAll(false);
                      setIsOpenInProduction(true);
                      setIsOpenReadDelivering(false);
                      setIsOpenSearchRender(false);
                      setIsOpenReadCompleted(false);
                      setIsOpenReadPendingDelivery(false);
                      setIsOpenStatusDropDown(!isOpenStatusDropDown);
                      inProductionStatus();
                    }}
                    className="bg-[#ffbec2]   rounded-md p-1 hover:text-white hover:bg-red-500"
                  >
                    In Production
                  </button>

                  <button
                    onClick={() => {
                      setIsOpenReadPendingPro(false);
                      setIsOpenReadAll(false);
                      setIsOpenInProduction(false);
                      setIsOpenReadDelivering(false);
                      setIsOpenSearchRender(false);
                      setIsOpenReadCompleted(false);
                      setIsOpenReadPendingDelivery(true);
                      setIsOpenStatusDropDown(!isOpenStatusDropDown);
                      pendingDeliveryStatus();
                    }}
                    className="bg-[#fdcd91]  rounded-md p-1 hover:text-white hover:bg-orange-500"
                  >
                    Pending Delivery
                  </button>
                  <button
                    onClick={() => {
                      setIsOpenReadPendingPro(false);
                      setIsOpenReadAll(false);
                      setIsOpenInProduction(false);
                      setIsOpenReadDelivering(true);
                      setIsOpenSearchRender(false);
                      setIsOpenReadCompleted(false);
                      setIsOpenReadPendingDelivery(false);
                      setIsOpenStatusDropDown(!isOpenStatusDropDown);
                      deliveringStatus();
                    }}
                    className="bg-[#f9ed80]  rounded-md p-1 hover:text-white hover:bg-yellow-500"
                  >
                    Delivering
                  </button>
                  <button
                    onClick={() => {
                      setIsOpenReadPendingPro(false);
                      setIsOpenReadAll(false);
                      setIsOpenInProduction(false);
                      setIsOpenReadDelivering(false);
                      setIsOpenSearchRender(false);
                      setIsOpenReadCompleted(true);
                      setIsOpenReadPendingDelivery(false);
                      setIsOpenStatusDropDown(!isOpenStatusDropDown);
                      completedStatus();
                    }}
                    className="bg-[#98d389]  rounded-md p-1 hover:text-white hover:bg-green-500"
                  >
                    Completed
                  </button>
                </div>
              )}
              {isCooldown ? (
                <BsCloudDownload
                  onClick={() => {
                    if (!loading) {
                      getApiFromZoho();
                    }
                  }}
                  className={`text-[#be853e] shadow-2xl w-10 h-10 cursor-pointer hover:text-[#cb9e67] `}
                />
              ) : (
                <LuLoader className="text-4xl animate-spin"></LuLoader>
              )}

              {hoverPrintButtonInfo1 && (
                <div className="absolute w-[300px] h-[150px] bg-black right-[550px] translate-y-[100px] z-30 text-white p-10">
                  You can multi-select an item then print multiple pages by this
                  button
                </div>
              )}
              {hoverPrintButtonInfo2 && (
                <div className="absolute w-[300px] h-[150px] bg-[#be853e] right-[30%] translate-y-[100px] z-30 text-white p-10">
                  You can multi-select an item then print all of them into one
                  page by this button
                </div>
              )}
              <PiPrinterBold
                onMouseOver={() => setHoverPrintButtonInfo1(true)}
                onMouseLeave={() => setHoverPrintButtonInfo1(false)}
                onClick={() => {
                  setIsOpenStatusDropDown(false);
                  printMutiOrderInManyPage();
                }}
                className="text-white bg-black rounded-md w-20 h-[37px] cursor-pointer  p-2  "
              />
              <PiPrinterBold
                onMouseOver={() => setHoverPrintButtonInfo2(true)}
                onMouseLeave={() => setHoverPrintButtonInfo2(false)}
                onClick={() => {
                  setIsOpenStatusDropDown(false);
                  printMultiOrderInOnePage();
                }}
                className="text-white bg-[#be853e]  rounded-md w-20 h-[37px] cursor-pointer  p-2 "
              />
            </div>
          </div>
          {selectRow && (
            <div className=" border-2 shadow-2xl  text-center w-[963px] bg-[#be853e] absolute flex items-center justify-center  right-[22px] h-[75vh] top-[149px]  ">
              <button
                className="absolute text-5xl text-white top-0 right-3"
                onClick={() => setSelectRow(false)}
              >
                X
              </button>
              <div className="bg-white  overflow-auto-scroll overflow-hidden w-[90%] translate-y-5 h-[90%]">
                <table className="h-[100%] w-[100%] ">
                  <tbody>
                    <tr className="border border-gray-500 ">
                      <td className="bg-black text-white border border-gray-500 w-[140px] ">
                        picture
                      </td>
                      <td className="h-20 flex justify-center p-1">
                        <img
                          onClick={() => {
                            setIsOpenZoom(true);
                            setZoomImage(
                              `images/${popupData.SKUArtwork_Preview.slice(
                                128,
                                141
                              )}.jpg`
                            );
                          }}
                          className="w-[300px] h-[300px] bg-slate-600 shadow-2xl  cursor-pointer border-black"
                          src={`images/${popupData.SKUArtwork_Preview.slice(
                            128,
                            141
                          )}.jpg`}
                        />
                      </td>
                    </tr>
                    <tr className="border border-gray-500 h-[50px]">
                      <td className="bg-black text-white border border-gray-500 ">
                        Administrator
                      </td>
                      <td className="text-left pl-2">
                        {popupData.Administrator}
                      </td>
                    </tr>
                    <tr className="border border-gray-500 h-[50px]">
                      <td className="bg-black text-white border border-gray-500 ">
                        Job Name
                      </td>
                      <td className="border border-gray-500 text-wrap text-left pl-2">
                        {popupData.SKU_Artwork_File.slice(139)}
                      </td>
                    </tr>
                    <tr className="border border-gray-500 h-[50px]">
                      <td className="bg-black text-white border border-gray-500">
                        Address Type
                      </td>
                      <td className="border border-gray-500 text-left pl-2">
                        {popupData.Address
                          ? popupData.Address
                          : "No Information"}
                      </td>
                    </tr>
                    <tr className="border border-gray-500 h-[50px]">
                      <td className="bg-black text-white border border-gray-500">
                        Customer Name
                      </td>
                      <td className="border border-gray-500 text-left pl-2">
                        {popupData.Recipient
                          ? popupData.Recipient
                          : "No Information"}
                      </td>
                    </tr>
                    <tr className="border border-gray-500 h-[150px]">
                      <td className="bg-black text-white border border-gray-500">
                        Customer Address
                      </td>
                      <td className="border border-gray-500 text-left pl-2 break-words ">
                        {popupData.Address_Details
                          ? popupData.Address_Details
                          : "No Information"}
                      </td>
                    </tr>

                    <tr className="border border-gray-500 h-[50px]">
                      <td className="bg-black text-white border border-gray-500">
                        Material
                      </td>
                      <td className="border border-gray-500 text-left pl-2 ">
                        {popupData.Material
                          ? popupData.Material
                          : "No Information"}
                      </td>
                    </tr>
                    <tr className="border border-gray-500 h-[50px]">
                      <td className="bg-black text-white border border-gray-500">
                        Status
                      </td>
                      <td className="border border-gray-500 text-left pl-2 ">
                        <div
                          className={`${
                            (popupData.Status == "In Production" &&
                              "bg-[#ffbec2]") ||
                            (popupData.Status == "Pending Production" &&
                              "bg-[#c9c9c9]") ||
                            (popupData.Status == "Delivering" &&
                              "bg-[#f9ed80]") ||
                            (popupData.Status == "Completed" &&
                              "bg-[#98d389]") ||
                            (popupData.Status == "Pending Delivery" &&
                              "bg-[#fdcd91]")
                          } w-fit h-fit p-1 rounded-md pr-5 pl-5`}
                        >
                          {popupData.Status}
                        </div>
                      </td>
                    </tr>
                    <tr className="border border-gray-500 h-[50px]">
                      <td className="bg-black text-white border border-gray-500">
                        Delivery Method
                      </td>
                      <td className="border border-gray-500 text-left pl-2 ">
                        {popupData.Delivery_Method
                          ? popupData.Delivery_Method
                          : "No Information"}
                      </td>
                    </tr>
                    <tr className="border border-gray-500 h-[50px]">
                      <td className="bg-black text-white border border-gray-500">
                        Quantity
                      </td>
                      <td className="border border-gray-500 text-left pl-2 ">
                        {popupData.Quantity
                          ? popupData.Quantity
                          : "No Information"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="flex gap-2 text-xl ">
            <div className="border-r-2 p-2 border-[#be853e] font-medium border-opacity-60">
              {adminUsername}
            </div>
            <button
              className=" text-xl font-medium pr-2"
              onClick={() => logout()}
            >
              {"  "} Logout
            </button>
          </div>
        </div>

        {isOnHover && (
          <div
            className="w-auto h-auto p-10 bg-opacity-80 bg-[#333] text-white absolute rounded-md shadow-2xl"
            style={{ top: `${15 + points.y}px`, left: `${15 + points.x}px` }}
          >
            {[hoverInfo].map((data, i) => {
              return (
                <div className="w-96 " key={i}>
                  <div className="flex gap-5">
                    <div>Admin in charge </div>
                    <div>{data.Administrator}</div>
                  </div>
                  <div className="flex gap-5">
                    <div>Type of address </div>
                    <div>{data.Address ? data.Address : "--"}</div>
                  </div>

                  <div className="flex gap-5">
                    <div>Address </div>
                    <div>
                      {data.Address_Details ? data.Address_Details : "--"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {loading ? (
          <LoadingPage />
        ) : (
          <div className="h-[80vh] overflow-scroll no-scrollbar    flex justify-start shadow-md  pl-5 ">
            <div className="w-[100%]">
              <table className=" w-[100%] text-center ">
                <thead className="  top-0 bg-white sticky z-10 shadow-lg ">
                  <tr className=" ">
                    <th className="border-r-2 border-[#be853e] pl-7 pr-7 pb-5 pt-5 w-[250px]">
                      Image{" "}
                    </th>
                    <th className="border-r-2 border-[#be853e] pl-7 pr-7 w-[300px]">
                      SKU
                    </th>
                    <th className="border-r-2 border-[#be853e] pl-7 pr-7  w-[300px]">
                      Customer Code
                    </th>
                    <th className="border-r-2 border-[#be853e] pl-7 pr-7  w-[300px]">
                      Delivery Method
                    </th>
                    <th className="border-r-2 border-[#be853e] pl-7 pr-7 w-[300px]">
                      Added Time
                    </th>
                    <th className="border-r-2 border-[#be853e] pl-7 pr-7 w-[300px]">
                      Quantity
                    </th>
                    <th className="border-r-2 border-[#be853e] pl-7 pr-7 w-[300px]">
                      Material
                    </th>
                    <th className="border-r-2 border-[#be853e] pl-7 pr-7 w-[300px]">
                      Status
                    </th>
                    <th className="border-l-2 border-[#be853e] w-5 "></th>
                  </tr>
                </thead>
                {isOpenSearchRender && (
                  <tbody
                    onMouseOut={() => setIsOnHover(false)}
                    onMouseMove={(e) => {
                      if (e) {
                        setIsOnHover(true);
                      }

                      setPoints({ x: e.pageX, y: e.pageY });
                      if (e.pageX > 1000) {
                        setPoints({ x: e.pageX - 490, y: e.pageY + 10 });
                      }
                      if (e.pageY > 450) {
                        setPoints({ x: e.pageX - 490, y: e.pageY - 250 });
                      }
                      if (e.pageY > 450 && e.pageX < 1000) {
                        setPoints({ x: e.pageX + 10, y: e.pageY - 250 });
                      }
                    }}
                  >
                    {searchRender.map((data, i) => {
                      return (
                        <tr
                          className={` hover:bg-[#be853e] hover:bg-opacity-15 hover:text-black cursor-pointer  ${
                            selectRow && data.Id == selectIdRow
                              ? "bg-[#be853e] text-white"
                              : "bg-white "
                          }`}
                          onMouseEnter={() => {
                            setHoverInfo(data);
                          }}
                          key={i}
                        >
                          <td className="border flex gap-2 ">
                            <input
                              onChange={() => {
                                return selectImageToPrint(data);
                              }}
                              className="w-5 bg-red-600"
                              type="checkbox"
                            />
                            <div
                              onClick={() => {
                                setIsOpenZoom(true);
                                return setZoomImage(
                                  `images/${data.SKUArtwork_Preview.slice(
                                    128,
                                    141
                                  )}.jpg`
                                );
                              }}
                              className="w-20 overflow-hidden "
                            >
                              <img
                                onMouseOver={() => setIsOnHover(false)}
                                className="w-20 bg-red-500 h-20"
                                src={`images/${data.SKUArtwork_Preview.slice(
                                  128,
                                  141
                                )}.jpg`}
                              />
                            </div>
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              console.log(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.SKU}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border"
                          >
                            {data.CustomerCustomer_Code}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Delivery_Method}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.CustomerAdded_Time}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Quantity}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Material}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border ${
                              (data.Status == "In Production" &&
                                "bg-[#ffbec2]") ||
                              (data.Status == "Pending Production" &&
                                "bg-[#c9c9c9]") ||
                              (data.Status == "Delivering" && "bg-[#f9ed80]") ||
                              (data.Status == "Completed" && "bg-[#98d389]") ||
                              (data.Status == "Pending Delivery" &&
                                "bg-[#fdcd91]")
                            }`}
                          >
                            {data.Status}
                          </td>
                          <td
                            onClick={() => {
                              console.log(data);
                              setUpdatePrintStatus(!updatePrintStatus);
                            }}
                            className={`border w-1 ${
                              updatePrintStatus && data.Id
                                ? "bg-[#be853e]"
                                : "bg-black"
                            }`}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}

                {isOpenReadAll && (
                  <tbody
                    onMouseOut={() => setIsOnHover(false)}
                    onMouseMove={(e) => {
                      if (e) {
                        setIsOnHover(true);
                      }

                      setPoints({ x: e.pageX, y: e.pageY });
                      if (e.pageX > 1000) {
                        setPoints({ x: e.pageX - 490, y: e.pageY + 10 });
                      }
                      if (e.pageY > 450) {
                        setPoints({ x: e.pageX - 490, y: e.pageY - 250 });
                      }
                      if (e.pageY > 450 && e.pageX < 1000) {
                        setPoints({ x: e.pageX + 10, y: e.pageY - 250 });
                      }
                    }}
                  >
                    {readAll.map((data, i) => {
                      return (
                        <tr
                          className={` hover:bg-[#be853e] hover:bg-opacity-15 hover:text-black   cursor-pointer  ${
                            selectRow && data.Id == selectIdRow
                              ? "bg-[#be853e] text-white"
                              : "bg-white "
                          }`}
                          onMouseEnter={() => {
                            setHoverInfo(data);
                          }}
                          key={i}
                        >
                          <td className="border flex  justify-evenly ">
                            <input
                              onChange={() => {
                                return selectImageToPrint(data);
                              }}
                              className="w-5 bg-white"
                              type="checkbox"
                            />
                            <div
                              onClick={() => {
                                setIsOpenZoom(true);
                                return setZoomImage(
                                  `images/${data.SKUArtwork_Preview.slice(
                                    128,
                                    141
                                  )}.jpg`
                                );
                              }}
                              className="w-[100px] overflow-hidden "
                            >
                              <img
                                className="w-20 h-20"
                                src={`images/${data.SKUArtwork_Preview.slice(
                                  128,
                                  141
                                )}.jpg`}
                              />
                            </div>
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.SKU}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border"
                          >
                            {data.CustomerCustomer_Code}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Delivery_Method}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.CustomerAdded_Time}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Quantity}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Material}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border ${
                              (data.Status == "In Production" &&
                                "bg-[#ffbec2]") ||
                              (data.Status == "Pending Production" &&
                                "bg-[#c9c9c9]") ||
                              (data.Status == "Delivering" && "bg-[#f9ed80]") ||
                              (data.Status == "Completed" && "bg-[#98d389]") ||
                              (data.Status == "Pending Delivery" &&
                                "bg-[#fdcd91]")
                            }`}
                          >
                            {data.Status}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border w-1 ${
                              data.PrintStatus ? "bg-[#be853e]" : "bg-black"
                            }`}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}

                {isOpenReadInProduction && (
                  <tbody
                    onMouseOut={() => setIsOnHover(false)}
                    onMouseMove={(e) => {
                      if (e) {
                        setIsOnHover(true);
                      }

                      setPoints({ x: e.pageX, y: e.pageY });
                      if (e.pageX > 1000) {
                        setPoints({ x: e.pageX - 490, y: e.pageY + 10 });
                      }
                      if (e.pageY > 450) {
                        setPoints({ x: e.pageX - 490, y: e.pageY - 250 });
                      }
                      if (e.pageY > 450 && e.pageX < 1000) {
                        setPoints({ x: e.pageX + 10, y: e.pageY - 250 });
                      }
                    }}
                  >
                    {readInProduction.map((data, i) => {
                      return (
                        <tr
                          className={`hover:bg-[#be853e] hover:bg-opacity-15 hover:text-black    cursor-pointer  ${
                            selectRow && data.Id == selectIdRow
                              ? "bg-[#be853e] text-white"
                              : "bg-white "
                          }`}
                          onClick={() => {
                            console.log(data);
                          }}
                          onMouseEnter={() => {
                            setHoverInfo(data);
                          }}
                          key={i}
                        >
                          <td className="border flex gap-2 ">
                            <input
                              onChange={() => {
                                return selectImageToPrint(data);
                              }}
                              className="w-5"
                              type="checkbox"
                            />
                            <div
                              onClick={() => {
                                setIsOpenZoom(true);
                                return setZoomImage(
                                  `images/${data.SKUArtwork_Preview.slice(
                                    128,
                                    141
                                  )}.jpg`
                                );
                              }}
                              className="w-20 overflow-hidden "
                            >
                              <img
                                className="w-20 h-20"
                                src={`images/${data.SKUArtwork_Preview.slice(
                                  128,
                                  141
                                )}.jpg`}
                              />
                            </div>
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.SKU}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border"
                          >
                            {data.CustomerCustomer_Code}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Delivery_Method}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.CustomerAdded_Time}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Quantity}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Material}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border ${
                              (data.Status == "In Production" &&
                                "bg-[#ffbec2]") ||
                              (data.Status == "Pending Production" &&
                                "bg-[#c9c9c9]") ||
                              (data.Status == "Delivering" && "bg-[#f9ed80]") ||
                              (data.Status == "Completed" && "bg-[#98d389]") ||
                              (data.Status == "Pending Delivery" &&
                                "bg-[#fdcd91]")
                            }`}
                          >
                            {data.Status}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border w-1 ${
                              data.PrintStatus ? "bg-[#be853e]" : "bg-black"
                            }`}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}

                {isOpenReadPendingPro && (
                  <tbody
                    onMouseOut={() => setIsOnHover(false)}
                    onMouseMove={(e) => {
                      if (e) {
                        setIsOnHover(true);
                      }

                      setPoints({ x: e.pageX, y: e.pageY });
                      if (e.pageX > 1000) {
                        setPoints({ x: e.pageX - 490, y: e.pageY + 10 });
                      }
                      if (e.pageY > 450) {
                        setPoints({ x: e.pageX - 490, y: e.pageY - 250 });
                      }
                      if (e.pageY > 450 && e.pageX < 1000) {
                        setPoints({ x: e.pageX + 10, y: e.pageY - 250 });
                      }
                    }}
                  >
                    {readPendingProduction.map((data, i) => {
                      return (
                        <tr
                          className={`hover:bg-[#be853e] hover:bg-opacity-15 hover:text-black   cursor-pointer  ${
                            selectRow && data.Id == selectIdRow
                              ? "bg-[#be853e] text-white"
                              : "bg-white "
                          }`}
                          onClick={() => {
                            console.log(data);
                          }}
                          onMouseEnter={() => {
                            setHoverInfo(data);
                          }}
                          key={i}
                        >
                          <td className="border flex gap-2  ">
                            <input
                              onChange={() => {
                                return selectImageToPrint(data);
                              }}
                              className="w-5"
                              type="checkbox"
                            />
                            <div
                              onClick={() => {
                                setIsOpenZoom(true);
                                return setZoomImage(
                                  `images/${data.SKUArtwork_Preview.slice(
                                    128,
                                    141
                                  )}.jpg`
                                );
                              }}
                              className="w-20 overflow-hidden "
                            >
                              <img
                                className="w-20 h-20"
                                src={`images/${data.SKUArtwork_Preview.slice(
                                  128,
                                  141
                                )}.jpg`}
                              />
                            </div>
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.SKU}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border"
                          >
                            {data.CustomerCustomer_Code}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Delivery_Method}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.CustomerAdded_Time}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Quantity}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Material}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border ${
                              (data.Status == "In Production" &&
                                "bg-[#ffbec2]") ||
                              (data.Status == "Pending Production" &&
                                "bg-[#c9c9c9]") ||
                              (data.Status == "Delivering" && "bg-[#f9ed80]") ||
                              (data.Status == "Completed" && "bg-[#98d389]") ||
                              (data.Status == "Pending Delivery" &&
                                "bg-[#fdcd91]")
                            }`}
                          >
                            {data.Status}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border w-1 ${
                              data.PrintStatus ? "bg-[#be853e]" : "bg-black"
                            }`}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}

                {isOpenReadPendingDelivery && (
                  <tbody
                    onMouseOut={() => setIsOnHover(false)}
                    onMouseMove={(e) => {
                      if (e) {
                        setIsOnHover(true);
                      }
                      setPoints({ x: e.pageX, y: e.pageY });
                      if (e.pageX > 1000) {
                        setPoints({ x: e.pageX - 490, y: e.pageY + 10 });
                      }
                      if (e.pageY > 450) {
                        setPoints({ x: e.pageX - 490, y: e.pageY - 250 });
                      }
                      if (e.pageY > 450 && e.pageX < 1000) {
                        setPoints({ x: e.pageX + 10, y: e.pageY - 250 });
                      }
                    }}
                  >
                    {readPendingDelivery.map((data, i) => {
                      return (
                        <tr
                          className={` hover:bg-[#be853e] hover:bg-opacity-15 hover:text-black  cursor-pointer  ${
                            selectRow && data.Id == selectIdRow
                              ? "bg-[#be853e] text-white"
                              : "bg-white "
                          }`}
                          onClick={() => {
                            console.log(data);
                          }}
                          onMouseEnter={() => {
                            setHoverInfo(data);
                          }}
                          key={i}
                        >
                          <td className="border flex gap-2 ">
                            <input
                              onChange={() => {
                                return selectImageToPrint(data);
                              }}
                              className="w-5"
                              type="checkbox"
                            />
                            <div
                              onClick={() => {
                                setIsOpenZoom(true);
                                return setZoomImage(
                                  `images/${data.SKUArtwork_Preview.slice(
                                    128,
                                    141
                                  )}.jpg`
                                );
                              }}
                              className="w-20 overflow-hidden "
                            >
                              <img
                                className="w-20 h-20"
                                src={`images/${data.SKUArtwork_Preview.slice(
                                  128,
                                  141
                                )}.jpg`}
                              />
                            </div>
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.SKU}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border"
                          >
                            {data.CustomerCustomer_Code}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Delivery_Method}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.CustomerAdded_Time}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Quantity}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Material}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border ${
                              (data.Status == "In Production" &&
                                "bg-[#ffbec2]") ||
                              (data.Status == "Pending Production" &&
                                "bg-[#c9c9c9]") ||
                              (data.Status == "Delivering" && "bg-[#f9ed80]") ||
                              (data.Status == "Completed" && "bg-[#98d389]") ||
                              (data.Status == "Pending Delivery" &&
                                "bg-[#fdcd91]")
                            }`}
                          >
                            {data.Status}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border w-1 ${
                              data.PrintStatus ? "bg-[#be853e]" : "bg-black"
                            }`}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
                {isOpenReadDelivering && (
                  <tbody
                    onMouseOut={() => setIsOnHover(false)}
                    onMouseMove={(e) => {
                      if (e) {
                        setIsOnHover(true);
                      }
                      setPoints({ x: e.pageX, y: e.pageY });
                      if (e.pageX > 1000) {
                        setPoints({ x: e.pageX - 490, y: e.pageY + 10 });
                      }
                      if (e.pageY > 450) {
                        setPoints({ x: e.pageX - 490, y: e.pageY - 250 });
                      }
                      if (e.pageY > 450 && e.pageX < 1000) {
                        setPoints({ x: e.pageX + 10, y: e.pageY - 250 });
                      }
                    }}
                  >
                    {readDelivering.map((data, i) => {
                      return (
                        <tr
                          className={`hover:bg-[#be853e] hover:bg-opacity-15 hover:text-black  cursor-pointer  ${
                            selectRow && data.Id == selectIdRow
                              ? "bg-[#be853e] text-white"
                              : "bg-white "
                          }`}
                          onClick={() => {}}
                          onMouseEnter={() => {
                            setHoverInfo(data);
                          }}
                          key={i}
                        >
                          <td className="border flex gap-2 ">
                            <input
                              onChange={() => {
                                return selectImageToPrint(data);
                              }}
                              className="w-5"
                              type="checkbox"
                            />
                            <div
                              onClick={() => {
                                setIsOpenZoom(true);
                                return setZoomImage(
                                  `images/${data.SKUArtwork_Preview.slice(
                                    128,
                                    141
                                  )}.jpg`
                                );
                              }}
                              className="w-20 overflow-hidden "
                            >
                              <img
                                className="w-20 h-20"
                                src={`images/${data.SKUArtwork_Preview.slice(
                                  128,
                                  141
                                )}.jpg`}
                              />
                            </div>
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.SKU}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border"
                          >
                            {data.CustomerCustomer_Code}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Delivery_Method}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.CustomerAdded_Time}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Quantity}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Material}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border ${
                              (data.Status == "In Production" &&
                                "bg-[#ffbec2]") ||
                              (data.Status == "Pending Production" &&
                                "bg-[#c9c9c9]") ||
                              (data.Status == "Delivering" && "bg-[#f9ed80]") ||
                              (data.Status == "Completed" && "bg-[#98d389]") ||
                              (data.Status == "Pending Delivery" &&
                                "bg-[#fdcd91]")
                            }`}
                          >
                            {data.Status}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border w-1 ${
                              data.PrintStatus ? "bg-[#be853e]" : "bg-black"
                            }`}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
                {isOpenReadCompleted && (
                  <tbody
                    onMouseOut={() => setIsOnHover(false)}
                    onMouseMove={(e) => {
                      if (e) {
                        setIsOnHover(true);
                      }
                      setPoints({ x: e.pageX, y: e.pageY });
                      if (e.pageX > 1000) {
                        setPoints({ x: e.pageX - 490, y: e.pageY + 10 });
                      }
                      if (e.pageY > 450) {
                        setPoints({ x: e.pageX - 490, y: e.pageY - 250 });
                      }
                      if (e.pageY > 450 && e.pageX < 1000) {
                        setPoints({ x: e.pageX + 10, y: e.pageY - 250 });
                      }
                    }}
                  >
                    {readCompleted.map((data, i) => {
                      return (
                        <tr
                          className={`hover:bg-[#be853e] hover:bg-opacity-15 hover:text-black  cursor-pointer  ${
                            selectRow && data.Id == selectIdRow
                              ? "bg-[#be853e] text-white"
                              : "bg-white "
                          }`}
                          onClick={() => {
                            console.log(data);
                          }}
                          onMouseEnter={() => {
                            setHoverInfo(data);
                          }}
                          key={i}
                        >
                          <td className="border flex gap-2 ">
                            <input
                              onChange={() => {
                                return selectImageToPrint(data);
                              }}
                              className="w-5"
                              type="checkbox"
                            />
                            <div
                              onClick={() => {
                                setIsOpenZoom(true);
                                return setZoomImage(
                                  `images/${data.SKUArtwork_Preview.slice(
                                    128,
                                    141
                                  )}.jpg`
                                );
                              }}
                              className="w-20 overflow-hidden "
                            >
                              <img
                                className="w-20 h-20"
                                src={`images/${data.SKUArtwork_Preview.slice(
                                  128,
                                  141
                                )}.jpg`}
                              />
                            </div>
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.SKU}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border"
                          >
                            {data.CustomerCustomer_Code}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Delivery_Method}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.CustomerAdded_Time}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Quantity}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className="border "
                          >
                            {data.Material}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border ${
                              (data.Status == "In Production" &&
                                "bg-[#ffbec2]") ||
                              (data.Status == "Pending Production" &&
                                "bg-[#c9c9c9]") ||
                              (data.Status == "Delivering" && "bg-[#f9ed80]") ||
                              (data.Status == "Completed" && "bg-[#98d389]") ||
                              (data.Status == "Pending Delivery" &&
                                "bg-[#fdcd91]")
                            }`}
                          >
                            {data.Status}
                          </td>
                          <td
                            onClick={() => {
                              setPopupData(data);
                              setSelectIdRow(data.Id);
                              setSelectRow(true);
                            }}
                            className={`border w-1 ${
                              data.PrintStatus ? "bg-[#be853e]" : "bg-black"
                            }`}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        )}
        <div className="flex justify-between gap-2 pr-1 pl-1 pt-5">
          <div className="flex pl-5">
            <div>© 2024 Gemicks Label | Created by</div>

            <a className="underline" href="https://meworx.me/">
              MEWorx
            </a>
          </div>
          <div className="flex">
            <div className="text-[#7b7b7b] text-2xl w-auto flex gap-1">
              <div>Pending Production:</div>
              <div>{readPendingProductionOrder.length}</div>
              <div className="pr-6">,</div>
            </div>
            <div className="text-[#ff5963] text-2xl flex gap-1">
              <div>In Production:</div>
              <div>{readInProductionOrder.length}</div>
              <div className="pr-6">,</div>
            </div>
            <div className="text-[c89103] text-2xl flex gap-1">
              <div>Pending Delivery:</div>
              <div>{readPendingDeliveryOrder.length}</div>
              <div className="pr-6">,</div>
            </div>
            <div className="text-[#c3b003] text-2xl flex gap-1">
              <div>Delivering:</div>
              <div>{readDeliveringOrder.length}</div>
              <div className="pr-6">,</div>
            </div>
            <div className="text-[#00ba07] text-2xl flex gap-1">
              <div>Completed: </div>
              <div>{readCopletedOrder.length}</div>
              <div className="pr-6">,</div>
            </div>
            <div className="text-2xl font-medium pr-5">
              Total: {readAll.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminWorkPage;
