import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, CreditCard, Calendar, MessageCircle, User } from "lucide-react";
import { getReadableDate } from "@/util/date";

export default function CustomerTimelineView({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Müşteri Zaman Çizelgesi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
            </div>
            <div className="pb-6">
              <div className="font-medium">
                Instagram üzerinden İlk İletişim
              </div>
              <div className="text-sm text-gray-500">
                {getReadableDate(data?.channels?.instagram?.first_message_date)}
              </div>
              <div className="mt-1 text-sm">
                Müşteri diş beyazlatma hizmetleri hakkında bilgi istedi
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
            </div>
            <div className="pb-6">
              <div className="font-medium">Telefon Numarası Verildi</div>
              <div className="text-sm text-gray-500">
                {getReadableDate(data?.channels?.instagram?.phone_giving_date)}
              </div>
              <div className="mt-1 text-sm">
                Müşteri iletişim bilgilerini paylaştı
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
            </div>
            <div className="pb-6">
              <div className="font-medium">İlk WhatsApp İletişimi</div>
              <div className="text-sm text-gray-500">
                {getReadableDate(data?.channels?.whatsapp?.first_message_date)}
              </div>
              <div className="mt-1 text-sm">
                Müşteri WhatsApp üzerinden randevusunu onayladı
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
            </div>
            <div className="pb-6">
              <div className="font-medium">Randevu Planlandı</div>
              <div className="text-sm text-gray-500">
                {getReadableDate(data?.portfolio?.appointments[0]?.date)}
              </div>
              <div className="mt-1 text-sm">
                Diş beyazlatma için ilk danışma
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div>
              <div className="font-medium">Ödeme Alındı</div>
              <div className="text-sm text-gray-500">
                {data?.payment_info?.payment_history[0].date}
              </div>
              <div className="mt-1 text-sm">
                Danışma ücreti:{" "}
                {data?.payment_info?.payment_history[0].amount.toFixed(2)} ₺
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
