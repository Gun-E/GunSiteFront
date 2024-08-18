'use client';

import React from "react";
import Slider from "react-slick";
import styles from '@/styles/SimpleSlider.module.css';
import Image from "next/image";

export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className={styles.sliderContainer}>
            <Slider {...settings}>
                <div className={styles.slide}>
                    <Image
                        src="/images/image3.png"
                        alt="Landscape picture"
                        fill
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        quality={100}
                    />
                </div>
                <div className={styles.slide}>
                    <Image
                        src="/images/image2.png"
                        alt="Landscape picture"
                        fill
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        quality={100}
                    />
                </div>
                <div className={styles.slide}>
                    <Image
                        src="/images/image1.png"
                        alt="Landscape picture"
                        fill
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        quality={100}
                    />
                </div>
            </Slider>
        </div>
    );
}
