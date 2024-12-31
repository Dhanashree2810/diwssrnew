import CartPage from "@/app/pages/carts/cartPage";
import { verifySession } from "@/app/lib/session";
import LoginDialog from "@/components/custom/LoginDialog";


export default async function CartPageWrapper() {
  const session = await verifySession();

  return (
    <div className=" mt-20">
      {session ? <CartPage /> : <LoginDialog />}
    </div>
  );
}

