'use client'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import "primeflex/primeflex.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";
import { GoInbox } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import Link from 'next/link';
import { CgEye } from "react-icons/cg";
import { RiFileEditLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";
import user1 from '@/assets/images/user (1).png'
import user2 from '@/assets/images/user (2).png'
import user3 from '@/assets/images/user.png'
import Image from 'next/image';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};


interface SummaryData {
    total: number;
    maxNo: number;
    minNo: number;
    avgNo: number;
}

interface TopData {
    id: number;
    name: string;
}

interface LastData {
    id: number;
    name: string;
}

interface HtmlData {
    name: string;
    html: string;
}

interface ListHomeCommonData {
    summaryData: SummaryData[];
    topData: TopData[];
    lastData: LastData[];
}

interface ListHomeCommonData {
    summaryData: SummaryData[];
    topData: TopData[];
    lastData: LastData[];
}

interface HtmlDataWrapper {
    htmlData: HtmlData[];
}

interface ListHomeUserData {
    summaryData: SummaryData[];
    topData: TopData[];
    lastData: LastData[];
}

interface AppUserHomePageProps {
    listHomeCommonData: ListHomeCommonData;
    htmlData: HtmlDataWrapper;
    listHomeUserData: ListHomeUserData;
}

export default function AppUserHomePage(props: AppUserHomePageProps) {
    const listHomeCommonData = props?.listHomeCommonData;
    const summaryData = listHomeCommonData?.summaryData;
    const topData = listHomeCommonData?.topData;
    
    // const listHtmlData = props?.htmlData;
    const listHomeUserData = props?.listHomeUserData;
    
    return (
        <div className="relative flex flex-col p-5">
            <div className="flex flex-col border-none mb-10">
                <section className="p-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
                        <div className="bg-white shadow p-5 border border-gray-200 rounded">
                            <div className="flex justify-between mb-3">
                                <div>
                                    <span className="block text-gray-500 font-medium mb-3">Total</span>
                                    <div className="text-gray-900 font-medium text-xl">{summaryData[0].total}</div>
                                </div>
                                <div className="flex items-center justify-center bg-blue-100 rounded" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <CiShoppingCart className=' text-blue-500 h-7 w-7' />

                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow p-5 border border-gray-200 rounded">
                            <div className="flex justify-between mb-3">
                                <div>
                                    <span className="block text-gray-500 font-medium mb-3">Average</span>
                                    <div className="text-gray-900 font-medium text-xl">{summaryData[0].avgNo}</div>
                                </div>
                                <div className="flex items-center justify-center bg-orange-100 rounded" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <MdOutlineLocationOn className=' text-orange-500 h-7 w-7' />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow p-5 border border-gray-200 rounded">
                            <div className="flex justify-between mb-3">
                                <div>
                                    <span className="block text-gray-500 font-medium mb-3">Max No</span>
                                    <div className="text-gray-900 font-medium text-xl">{summaryData[0].maxNo}</div>
                                </div>
                                <div className="flex items-center justify-center bg-cyan-100 rounded" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <GoInbox className=' text-cyan-500  h-7 w-7' />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow p-5 border border-gray-200 rounded">
                            <div className="flex justify-between mb-3">
                                <div>
                                    <span className="block text-gray-500 font-medium mb-3">Min No</span>
                                    <div className="text-gray-900 font-medium text-xl">{summaryData[0].minNo}</div>
                                </div>
                                <div className="flex items-center justify-center bg-purple-100 rounded" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <FaRegComment className=' text-purple-500 h-7 w-7' />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="p-2 flex items-center justify-center my-8">
                    <Link href="/appuser">
                        <Button
                            label="View all AppUsers"
                            className="p-button-raised p-button-rounded rounded-md bg-gradient-to-r from-[#9333EA] to-[#609AF8] text-white p-4 border-none"
                        />
                    </Link>
                </section>

                <section>
                    <Slider {...settings} className="text-white">
                        {topData.map((slide:TopData) => (
                            <div key={slide.id} className="h-full flex items-center justify-center">
                                <div className="grid grid-cols-1 max-w-full gap-5 items-center justify-center px-2 py-4 lg:px-4 lg:py-6">
                                    <div className="flex flex-col overflow-hidden p-5 shadow-lg rounded-lg bg-white">
                                        <div className="mb-3 flex justify-center">
                                            <Image
                                                src={user3}
                                                alt={slide.name}
                                                className="h-[150px] w-[150px] lg:h-[150px] lg:w-[150px] object-cover rounded-full"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-lg font-semibold text-gray-600 mb-1">{slide.name}</h4>
                                            {/* <h6 className="text-gray-600 text-sm mb-3">{slide.emailId}</h6> */}
                                            <div className="car-buttons flex justify-center gap-3 mt-5">
                                                <Link href={`/appuser/view/${slide.id}`} className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-[#9333EA] to-[#609AF8]">
                                                    <CgEye className="text-white h-6 w-6" />
                                                </Link>
                                                <Link href={`/appuser/edit/${slide.id}`} className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-[#9333EA] to-[#609AF8]">
                                                    <RiFileEditLine className="text-white h-6 w-6" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </section>

                <section className="lg:p-10 mt-12 lg:mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-32">
                        <div className="bg-white shadow-md rounded p-4">
                            <div className="flex justify-between items-center mb-5">
                                <span className="text-xl font-semibold">Created by Me</span>
                            </div>
                            <ul>
                                {listHomeUserData.topData.map((item:TopData) => (
                                    <li
                                        key={item.name}
                                        className="flex flex-row items-center justify-between gap-20 lg:gap-48 mb-8"
                                    >
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={user1}
                                                alt={item.name}
                                                className="w-32 h-32 object-cover rounded-full"
                                                objectFit='cover'
                                            />
                                        </div>

                                        <div className="flex flex-col justify-between items-start flex-1">
                                            <div>
                                                <span className="font-medium text-gray-900">{item.name}</span>
                                                {/* <div className="text-gray-600">{item.emailId}</div> */}
                                            </div>
                                            <div className="mt-2 flex space-x-2">
                                                <Link
                                                    href={`/appuser/view/${item.id}`}
                                                    className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-[#9333EA] to-[#609AF8]"
                                                >
                                                    <CgEye className="text-white h-5 w-5" />
                                                </Link>

                                                <Link
                                                    href={`/appuser/edit/${item.id}`}
                                                    className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-[#9333EA] to-[#609AF8]"
                                                >
                                                    <RiFileEditLine className="text-white h-5 w-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white shadow-md rounded p-4">
                            <div className="flex justify-between items-center mb-5">
                                <span className="text-xl font-medium">
                                    Top {listHomeCommonData?.topData?.length} Users
                                </span>
                            </div>

                            <ul>
                                {listHomeCommonData.topData.map((item:TopData) => (
                                    <li
                                        key={item.name}
                                        className="flex flex-row items-center justify-between gap-20 lg:gap-48 mb-8"
                                    >
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={user1}
                                                alt={item.name}
                                                className="w-32 h-32 object-cover rounded-full"
                                                objectFit='cover'
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center items-start flex-1">
                                            <div>
                                                <span className="font-medium text-gray-900">{item.name}</span>
                                                {/* <div className="text-gray-600">{item.emailId}</div> */}
                                            </div>
                                            <div className="mt-2 flex space-x-2">
                                                <Link
                                                    href={`/appuser/view/${item.id}`}
                                                    className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-[#9333EA] to-[#609AF8]"
                                                >
                                                    <CgEye className="text-white h-5 w-5" />
                                                </Link>
                                                <Link
                                                    href={`/appuser/edit/${item.id}`}
                                                    className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-[#9333EA] to-[#609AF8]"
                                                >
                                                    <RiFileEditLine className="text-white h-5 w-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {listHomeCommonData?.lastData?.length > 0 && (
                    <section className="px-2 mt-10 lg:px-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {listHomeCommonData.lastData.slice(0, 4).map((item: LastData, index: number) => (
                                <Card key={index} className="shadow-md text-center">
                                    <Image
                                        src={user2}
                                        alt="Image"
                                        className="mx-auto block mb-4 w-32 h-32"
                                        objectFit='cover'
                                    />
                                    <div className="text-xl font-medium mb-3 text-gray-900">{item.name}</div>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        Nunc mi ipsum faucibus vitae aliquet nec. Lacus sed viverra tellus in hac habitasse platea dictumst.
                                    </p>
                                    <div className='flex space-x-2 justify-center'>
                                        <Link
                                            href={`/appuser/view/${item.id}`}
                                            className="flex items-center text-white rounded-full p-3 bg-gradient-to-r from-[#9333EA] to-[#609AF8] space-x-2"
                                        >
                                            <FaArrowRight className="w-5 h-5" />
                                            <span>View</span>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* <div className="table-title">
                    {listHtmlData && listHtmlData.length && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: listHtmlData.join(''),
                            }}
                        />
                    )}
                </div> */}
            </div>
        </div>
    )
}
