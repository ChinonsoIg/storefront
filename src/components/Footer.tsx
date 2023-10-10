import Link from "next/link";
import { useRouter } from "next/router";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";

export default function Footer() {
  const router = useRouter();
  const path = router.pathname;

  return (
    <footer className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 bg-[color:var(--bg-footer)] text-[color:var(--white)] p-5 border-t border-gray-400 mt-auto">
      <div className="col-span-1.5 lg:col-span-2 text-sm">
        <Link href="/" className="font-bold text-xl">
          FemaleSuave
        </Link>
        <p>hello@femalesuave.com</p>
        <p>+234 803 0000 000</p>
      </div>
      <div className="col-span-1 text-sm">
        <h6 className="text-md font-bold text-[(color:var(--white))] underline">About FemaleSuave</h6>
        <p>Terms and Condition</p>
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
      </div>
      <div className="col-span-1 text-sm md:order-last lg:order-none">
        <h6 className="text-md font-bold text-[(color:var(--white))] underline">Sell on FemaleSuave</h6>
        <p className="font-semibold">
          <Link href="" target="_blank">
            Become a Seller
          </Link>
        </p>
      </div>
      <div className="col-span-1 text-sm">
        <h6  className="text-md font-bold text-[(color:var(--white))] underline">We&apos;re on socials</h6>
        <div className="flex gap-3 mt-2">
          <BsTwitter size={18} />
          <BsFacebook size={18} />
          <BsInstagram size={18} />
        </div>
      </div>
    </footer>
  );

}
