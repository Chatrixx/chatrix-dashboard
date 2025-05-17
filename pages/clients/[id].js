import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Mail,
  CreditCard,
  Calendar,
  MessageSquare,
  Instagram,
  MessageCircle,
  FileText,
  User,
  Clock,
  Info,
  CalendarDays,
  CreditCardIcon as PaymentIcon,
  WebcamIcon as ChatIcon,
} from "lucide-react";
import MainLayout from "@/components/custom/layout/main-layout";
import TotalPaymentsView from "@/views/clientDetails/total-payments-view";
import NewPaymenstView from "@/views/clientDetails/new-payments-view";
import InvoiceHistoryView from "@/views/clientDetails/invoice-history-view";
import ServicePriceHistoryView from "@/views/clientDetails/service-price-history-view";
import CurrentTreatmentsView from "@/views/clientDetails/current-treatments-view";
import CompletedTreatmentsView from "@/views/clientDetails/completed-treatments-view";
import TreatmentHistoryView from "@/views/clientDetails/treatment-history-view";
import UpcomingAppointmentsView from "@/views/clientDetails/upcoming-appointments-view";
import useClientData from "@/hooks/data/use-client-data";
import { getReadableDate } from "@/util/date";

export default function CustomerDetail() {
  const params = useParams();
  const { data, isFetching } = useClientData({ id: params.id });

  return (
    <div className="container mx-auto py-6">
      {/* Customer Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-gray-200">
            <AvatarImage
              src={data?.profile_pic || "/placeholder.svg"}
              alt={data?.full_name}
            />
            <AvatarFallback>
              {data?.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{data?.full_name}</h1>
            <div className="flex items-center space-x-2 text-gray-500">
              <Badge variant="outline" className="text-xs">
                Müşteri ID: {params?.id}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Ara
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Mesaj
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Randevu
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Genel Bilgiler
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Randevular
          </TabsTrigger>
          <TabsTrigger value="treatments" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Tedaviler
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center">
            <PaymentIcon className="h-4 w-4 mr-2" />
            Ödemeler
          </TabsTrigger>
          <TabsTrigger value="chats" className="flex items-center">
            <ChatIcon className="h-4 w-4 mr-2" />
            Görüşmeler
          </TabsTrigger>
        </TabsList>

        {/* General Info Tab */}
        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">İletişim Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{data?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{data?.email}</span>
                  </div>
                  {data?.channels.instagram && (
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 mr-2 text-gray-500" />
                      <span>
                        @{data?.channels?.instagram?.profile_info?.ig_username}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Customer Problem/Question Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Müşteri Özeti</CardTitle>
                  <CardDescription>Konuşma analizine dayalı</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Ana Sorun</h4>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {data?.chat_summary?.main_issue}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Önemli Noktalar</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {data?.chat_summary?.key_points.map((point, index) => (
                          <li key={index} className="text-sm">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Duygu Durumu:</span>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {data?.chat_summary?.sentiment}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Son güncelleme:{" "}
                        {getReadableDate(data?.chat_summary?.last_updated)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Müşteri Zaman Çizelgesi
                  </CardTitle>
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
                          {getReadableDate(
                            data?.channels?.instagram?.first_message_date,
                          )}
                        </div>
                        <div className="mt-1 text-sm">
                          Müşteri diş beyazlatma hizmetleri hakkında bilgi
                          istedi
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
                        <div className="font-medium">
                          Telefon Numarası Verildi
                        </div>
                        <div className="text-sm text-gray-500">
                          {getReadableDate(
                            data?.channels?.instagram?.phone_giving_date,
                          )}
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
                        <div className="font-medium">
                          İlk WhatsApp İletişimi
                        </div>
                        <div className="text-sm text-gray-500">
                          {getReadableDate(
                            data?.channels?.whatsapp?.first_message_date,
                          )}
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
                          {getReadableDate(
                            data?.portfolio?.appointments[0]?.date,
                          )}
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
                          {data?.payment_info?.payment_history[0].amount.toFixed(
                            2,
                          )}{" "}
                          ₺
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upcoming Appointments */}
            <UpcomingAppointmentsView customer={data} />

            {/* Appointment History */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Randevu Geçmişi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6 ml-8">
                    {data?.portfolio?.appointments?.map((appointment) => (
                      <div key={appointment.id} className="relative">
                        <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full bg-gray-200"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b">
                          <div>
                            <h4 className="font-medium">{appointment.type}</h4>
                            <p className="text-sm text-gray-500">
                              {getReadableDate(appointment.date)}
                            </p>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "Onaylandı"
                                ? "default"
                                : "outline"
                            }
                            className="mt-2 md:mt-0"
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm">{appointment.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Treatments Tab */}
        <TabsContent value="treatments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Treatments */}
            <CurrentTreatmentsView customer={data} />

            {/* Completed Treatments */}
            <CompletedTreatmentsView customer={data} />

            {/* Treatment History */}
            <TreatmentHistoryView customer={data} />
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left column: stack payment summary and new payments vertically */}
            <div className="flex flex-col gap-6">
              <TotalPaymentsView customer={data} isLoading={isFetching} />
              <NewPaymenstView />
            </div>
            {/* Right column: invoice history */}
            <div>
              <ServicePriceHistoryView customer={data} />
            </div>
          </div>
          <InvoiceHistoryView customer={data} />
        </TabsContent>

        {/* Chats Tab */}
        <TabsContent value="chats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chat Channels */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">İletişim Kanalları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.channels?.instagram && (
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                          <Instagram className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Instagram</h4>
                          <p className="text-xs text-gray-500">
                            @{data?.channels?.instagram.username}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {data?.channels?.instagram?.messages?.length} mesaj
                      </Badge>
                    </div>
                  )}

                  {data?.channels?.whatsapp && (
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <MessageCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">WhatsApp</h4>
                          <p className="text-xs text-gray-500">{data?.phone}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {data?.channels?.whatsapp?.messages?.length} mesaj
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chat History */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Görüşme Geçmişi</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="instagram">
                    <TabsList className="mb-4">
                      {data?.channels?.instagram && (
                        <TabsTrigger
                          value="instagram"
                          className="flex items-center"
                        >
                          <Instagram className="h-4 w-4 mr-2" />
                          Instagram
                        </TabsTrigger>
                      )}
                      {data?.channels?.whatsapp && (
                        <TabsTrigger
                          value="whatsapp"
                          className="flex items-center"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="instagram" className="space-y-4">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div>
                          İlk iletişim:{" "}
                          {getReadableDate(
                            data?.channels?.instagram?.first_message_date,
                          )}
                        </div>
                        <div>
                          Son mesaj:{" "}
                          {getReadableDate(
                            data?.channels?.instagram?.last_message_date,
                          )}
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                          {data?.channels?.instagram?.messages?.map(
                            (message) => (
                              <div
                                key={message.id}
                                className={`flex ${message.sender === "customer" ? "justify-start" : "justify-end"}`}
                              >
                                <div
                                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    message.sender === "customer"
                                      ? "bg-white border border-gray-200 text-gray-800"
                                      : "bg-blue-500 text-white"
                                  }`}
                                >
                                  <p>{message.content}</p>
                                  <p
                                    className={`text-right text-xs mt-1 ${
                                      message.sender === "customer"
                                        ? "text-gray-500"
                                        : "text-blue-100"
                                    }`}
                                  >
                                    {getReadableDate(message?.timestamp)}
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Sohbeti Dışa Aktar
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Instagram'dan Yanıtla
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="whatsapp" className="space-y-4">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div>
                          İlk iletişim:{" "}
                          {getReadableDate(
                            data?.channels?.whatsapp?.first_message_date,
                          )}
                        </div>
                        <div>
                          Son mesaj:{" "}
                          {getReadableDate(
                            data?.channels?.whatsapp?.last_message_date,
                          )}
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                          {data?.channels?.whatsapp?.messages?.map(
                            (message) => (
                              <div
                                key={message.id}
                                className={`flex ${message?.sender === "customer" ? "justify-start" : "justify-end"}`}
                              >
                                <div
                                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    message.sender === "customer"
                                      ? "bg-white border border-gray-200 text-gray-800"
                                      : "bg-green-500 text-white"
                                  }`}
                                >
                                  <p>{message.content}</p>
                                  <p
                                    className={`text-right text-xs mt-1 ${
                                      message.sender === "customer"
                                        ? "text-gray-500"
                                        : "text-green-100"
                                    }`}
                                  >
                                    {getReadableDate(message?.timestamp)}
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Sohbeti Dışa Aktar
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp'tan Yanıtla
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

CustomerDetail.getLayout = (children) => <MainLayout>{children}</MainLayout>;
